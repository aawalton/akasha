import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Corpus } from "./corpus.module.code.ts"
import { corpusIn } from "./corpus.module.code.ts"
import {
  closureFor,
  conditionalFor,
  propertyTypesOf,
  typeChainOf,
  warrantsFor,
} from "./required-reading.module.code.ts"

type Held = { readonly at: string; readonly value: Record<string, unknown> }

const SPINE: readonly Held[] = [
  { at: "page.page-type.ts", value: { slug: "page", extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { slug: "page-type", extendsSlug: "page" } },
  {
    at: "page-property-type.page-type.ts",
    value: { slug: "page-property-type", extendsSlug: "page" },
  },
  { at: "thing.page-type.ts", value: { slug: "thing", extendsSlug: "page" } },
  { at: "deep.page-type.ts", value: { slug: "deep", extendsSlug: "thing" } },
  {
    at: "page-slug.page-property-type.ts",
    value: { slug: "page-slug", kind: "relation", targetPageTypeSlug: "page" },
  },
  {
    at: "part-slugs.page-property-type.ts",
    value: { slug: "part-slugs", kind: "list", entrySlug: "page-slug" },
  },
  {
    at: "required-reading-slugs.page-property-type.ts",
    value: { slug: "required-reading-slugs", kind: "list", entrySlug: "page-slug" },
  },
  {
    at: "conditional-reading-slugs.page-property-type.ts",
    value: { slug: "conditional-reading-slugs", kind: "list", entrySlug: "page-slug" },
  },
  { at: "definition.page-property-type.ts", value: { slug: "definition", kind: "text" } },
]

let count = 0

function treeOf(all: readonly Held[]): { root: string; corpus: Corpus } {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-warrant-${count}-`)
  for (const one of [...SPINE, ...all]) {
    const at = `${root}/${one.at}`
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(at, `export const ${key} = ${JSON.stringify(one.value, null, 2)}\n`)
  }
  const corpus = corpusIn(root)
  if ("refused" in corpus) throw new Error(corpus.refused)
  return { root, corpus }
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

const TREE: readonly Held[] = [
  { at: "whole.thing.ts", value: { slug: "whole", partSlugs: ["middle"] } },
  { at: "middle.thing.ts", value: { slug: "middle", partSlugs: ["leaf"] } },
  { at: "leaf.thing.ts", value: { slug: "leaf", definition: "the one at the bottom" } },
]

test("required reading climbs to every whole above a page", () => {
  const { root, corpus } = treeOf(TREE)
  try {
    const owed = warrantsFor(`${root}/leaf.thing.ts`, corpus)
    expect(owed).toContain(`${root}/middle.thing.ts`)
    expect(owed).toContain(`${root}/whole.thing.ts`)
  } finally {
    away(root)
  }
})

test("required reading does not descend, so reading a whole does not pull its parts", () => {
  const { root, corpus } = treeOf(TREE)
  try {
    const owed = warrantsFor(`${root}/whole.thing.ts`, corpus)
    expect(owed).not.toContain(`${root}/middle.thing.ts`)
    expect(owed).not.toContain(`${root}/leaf.thing.ts`)
  } finally {
    away(root)
  }
})

test("required reading follows what a page names, and what those name in turn", () => {
  const { root, corpus } = treeOf([
    { at: "a.thing.ts", value: { slug: "a", requiredReadingSlugs: ["b"] } },
    { at: "b.thing.ts", value: { slug: "b", requiredReadingSlugs: ["c"] } },
    { at: "c.thing.ts", value: { slug: "c" } },
  ])
  try {
    const owed = warrantsFor(`${root}/a.thing.ts`, corpus)
    expect(owed).toContain(`${root}/b.thing.ts`)
    expect(owed).toContain(`${root}/c.thing.ts`)
  } finally {
    away(root)
  }
})

test("a page that requires one that requires it back is allowed and does not hang", () => {
  const { root, corpus } = treeOf([
    { at: "a.thing.ts", value: { slug: "a", requiredReadingSlugs: ["b"] } },
    { at: "b.thing.ts", value: { slug: "b", requiredReadingSlugs: ["a"] } },
  ])
  try {
    const owed = warrantsFor(`${root}/a.thing.ts`, corpus)
    expect(owed).toContain(`${root}/b.thing.ts`)
    expect(owed).not.toContain(`${root}/a.thing.ts`)
  } finally {
    away(root)
  }
})

test("a page never owes itself", () => {
  const { root, corpus } = treeOf([
    { at: "a.thing.ts", value: { slug: "a", requiredReadingSlugs: ["a"] } },
  ])
  try {
    expect(warrantsFor(`${root}/a.thing.ts`, corpus)).not.toContain(`${root}/a.thing.ts`)
  } finally {
    away(root)
  }
})

test("the page types a page derives from are owed, all the way up the chain", () => {
  const { root, corpus } = treeOf([{ at: "one.deep.ts", value: { slug: "one" } }])
  try {
    expect(typeChainOf(`${root}/one.deep.ts`, corpus)).toEqual([
      `${root}/deep.page-type.ts`,
      `${root}/thing.page-type.ts`,
      `${root}/page.page-type.ts`,
    ])
  } finally {
    away(root)
  }
})

test("a page type does not owe itself when it is the page being read", () => {
  const { root, corpus } = treeOf([])
  try {
    expect(typeChainOf(`${root}/thing.page-type.ts`, corpus)).not.toContain(
      `${root}/thing.page-type.ts`
    )
  } finally {
    away(root)
  }
})

test("the property type of every property a page carries is owed", () => {
  const { root, corpus } = treeOf([
    { at: "one.thing.ts", value: { slug: "one", definition: "held", partSlugs: [] } },
  ])
  try {
    const owed = propertyTypesOf(`${root}/one.thing.ts`, corpus)
    expect(owed).toContain(`${root}/definition.page-property-type.ts`)
    expect(owed).toContain(`${root}/part-slugs.page-property-type.ts`)
  } finally {
    away(root)
  }
})

test("a page's identity, slug and page type are not properties that carry a page of their own", () => {
  const { root, corpus } = treeOf([
    { at: "one.thing.ts", value: { slug: "one", id: "x", pageTypeSlug: "thing" } },
  ])
  try {
    expect(propertyTypesOf(`${root}/one.thing.ts`, corpus)).toEqual([])
  } finally {
    away(root)
  }
})

test("what a page owes is answered in one order however it was reached", () => {
  const { root, corpus } = treeOf(TREE)
  try {
    const once = warrantsFor(`${root}/leaf.thing.ts`, corpus)
    expect([...once].sort()).toEqual([...once])
    expect(closureFor(`${root}/leaf.thing.ts`, corpus)).toEqual(once)
  } finally {
    away(root)
  }
})

test("what a whole above owes is owed by the page below it", () => {
  const { root, corpus } = treeOf([
    {
      at: "whole.thing.ts",
      value: { slug: "whole", partSlugs: ["leaf"], requiredReadingSlugs: ["far"] },
    },
    { at: "leaf.thing.ts", value: { slug: "leaf" } },
    { at: "far.thing.ts", value: { slug: "far" } },
  ])
  try {
    expect(warrantsFor(`${root}/leaf.thing.ts`, corpus)).toContain(`${root}/far.thing.ts`)
  } finally {
    away(root)
  }
})

test("conditional reading is gathered from what was named, and is not required reading", () => {
  const { root, corpus } = treeOf([
    { at: "a.thing.ts", value: { slug: "a", conditionalReadingSlugs: ["maybe"] } },
    { at: "maybe.thing.ts", value: { slug: "maybe", definition: "read it if it bears" } },
  ])
  try {
    expect(conditionalFor([`${root}/a.thing.ts`], corpus)).toEqual([`${root}/maybe.thing.ts`])
    expect(warrantsFor(`${root}/a.thing.ts`, corpus)).not.toContain(`${root}/maybe.thing.ts`)
  } finally {
    away(root)
  }
})

test("one document named conditional by two pages is gathered once", () => {
  const { root, corpus } = treeOf([
    { at: "a.thing.ts", value: { slug: "a", conditionalReadingSlugs: ["maybe"] } },
    { at: "b.thing.ts", value: { slug: "b", conditionalReadingSlugs: ["maybe"] } },
    { at: "maybe.thing.ts", value: { slug: "maybe" } },
  ])
  try {
    expect(conditionalFor([`${root}/a.thing.ts`, `${root}/b.thing.ts`], corpus)).toEqual([
      `${root}/maybe.thing.ts`,
    ])
  } finally {
    away(root)
  }
})

test("a path the corpus does not carry owes nothing rather than throwing", () => {
  const { root, corpus } = treeOf([])
  try {
    expect(warrantsFor(`${root}/notes.txt`, corpus)).toEqual([])
    expect(typeChainOf(`${root}/notes.txt`, corpus)).toEqual([])
    expect(propertyTypesOf(`${root}/notes.txt`, corpus)).toEqual([])
  } finally {
    away(root)
  }
})
