import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve as resolvePath } from "node:path"
import type { Edges, Filed, Source } from "./corpus.module.code.ts"
import { corpusIn, corpusOver, filedIn } from "./corpus.module.code.ts"

const AKASHA = resolvePath(import.meta.dir, "..")

type Held = {
  readonly at: string
  readonly value: Record<string, unknown>
}

const PAGE_TYPES: readonly Held[] = [
  { at: "page.page-type.ts", value: { slug: "page", extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { slug: "page-type", extendsSlug: "page" } },
  {
    at: "page-property-type.page-type.ts",
    value: { slug: "page-property-type", extendsSlug: "page" },
  },
  { at: "thing.page-type.ts", value: { slug: "thing", extendsSlug: "page" } },
  { at: "other.page-type.ts", value: { slug: "other", extendsSlug: "page" } },
  { at: "deep.page-type.ts", value: { slug: "deep", extendsSlug: "thing" } },
]

const PROPERTIES: readonly Held[] = [
  {
    at: "page-slug.page-property-type.ts",
    value: { slug: "page-slug", kind: "relation", targetPageTypeSlug: "page" },
  },
  {
    at: "thing-slug.page-property-type.ts",
    value: { slug: "thing-slug", kind: "relation", targetPageTypeSlug: "thing" },
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
]

let count = 0

function treeOf(all: readonly Held[]): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-corpus-${count}-`)
  for (const one of [...PAGE_TYPES, ...PROPERTIES, ...all]) {
    const at = `${root}/${one.at}`
    const cut = at.lastIndexOf("/")
    mkdirSync(at.slice(0, cut), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(at, `export const ${key} = ${JSON.stringify(one.value, null, 2)}\n`)
  }
  return root
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

const DUP: readonly Held[] = [
  { at: "one/dup.thing.ts", value: { slug: "dup", definition: "the thing one" } },
  { at: "two/dup.other.ts", value: { slug: "dup", definition: "the other one" } },
]

test("two pages of different page types carry one slug and the corpus builds", () => {
  const root = treeOf(DUP)
  try {
    const corpus = corpusIn(root)
    expect(corpus.every().filter((one) => one.slug === "dup")).toHaveLength(2)
  } finally {
    away(root)
  }
})

test("a slug two page types carry resolves to neither where nothing narrows it", () => {
  const root = treeOf(DUP)
  try {
    const what = corpusIn(root).resolve("dup", null)
    expect(what.kind).toBe("many")
    if (what.kind !== "many") return
    expect(what.among.map((one) => one.pageTypeSlug).sort()).toEqual(["other", "thing"])
  } finally {
    away(root)
  }
})

test("the relation's declared target narrows a shared slug to one page, each way", () => {
  const root = treeOf(DUP)
  try {
    const corpus = corpusIn(root)
    const thing = corpus.resolve("dup", "thing")
    const other = corpus.resolve("dup", "other")
    expect(thing.kind).toBe("one")
    expect(other.kind).toBe("one")
    if (thing.kind !== "one" || other.kind !== "one") return
    expect(thing.at.path).toBe(`${root}/one/dup.thing.ts`)
    expect(other.at.path).toBe(`${root}/two/dup.other.ts`)
  } finally {
    away(root)
  }
})

test("a target both page types extend narrows nothing", () => {
  const root = treeOf(DUP)
  try {
    expect(corpusIn(root).resolve("dup", "page").kind).toBe("many")
  } finally {
    away(root)
  }
})

test("naming a slug two page types carry is refused, and the refusal names both", () => {
  const root = treeOf([
    ...DUP,
    { at: "asks.thing.ts", value: { slug: "asks", requiredReadingSlugs: ["dup"] } },
  ])
  try {
    expect(() => corpusIn(root)).toThrow(/`asks` names `dup` under `required-reading-slugs`/)
    expect(() => corpusIn(root)).toThrow(/`thing` and `other` both carry that slug/)
    expect(() => corpusIn(root)).toThrow(/a slug is unique among the pages of its page type/)
  } finally {
    away(root)
  }
})

test("the refusal naming two candidates words them the same way every run", () => {
  const root = treeOf([
    ...DUP,
    { at: "asks.thing.ts", value: { slug: "asks", requiredReadingSlugs: ["dup"] } },
  ])
  try {
    const said = new Set<string>()
    for (let go = 0; go < 4; go++) {
      try {
        corpusIn(root)
      } catch (thrown) {
        said.add(thrown instanceof Error ? thrown.message : String(thrown))
      }
    }
    expect(said.size).toBe(1)
  } finally {
    away(root)
  }
})

test("a slug no page carries is refused rather than dropped", () => {
  const root = treeOf([
    { at: "asks.thing.ts", value: { slug: "asks", requiredReadingSlugs: ["missing"] } },
  ])
  try {
    expect(() => corpusIn(root)).toThrow(/no page carries that slug/)
    expect(() => corpusIn(root)).toThrow(/refused here rather than dropped/)
  } finally {
    away(root)
  }
})

test("a slug named under part-slugs and under conditional-reading-slugs is refused the same way", () => {
  for (const key of ["partSlugs", "conditionalReadingSlugs"]) {
    const root = treeOf([{ at: "asks.thing.ts", value: { slug: "asks", [key]: ["missing"] } }])
    try {
      expect(() => corpusIn(root)).toThrow(/no page carries that slug/)
    } finally {
      away(root)
    }
  }
})

test("a page type admits the one it extends, transitively, and no sibling", () => {
  const root = treeOf([])
  try {
    const corpus = corpusIn(root)
    expect(corpus.admits("deep", "thing")).toBe(true)
    expect(corpus.admits("deep", "page")).toBe(true)
    expect(corpus.admits("deep", "deep")).toBe(true)
    expect(corpus.admits("thing", "deep")).toBe(false)
    expect(corpus.admits("thing", "other")).toBe(false)
  } finally {
    away(root)
  }
})

test("a list property's target is the target of the relation it holds", () => {
  const root = treeOf([])
  try {
    const corpus = corpusIn(root)
    expect(corpus.targetFor("part-slugs")).toBe("page")
    expect(corpus.targetFor("thing-slug")).toBe("thing")
    expect(corpus.targetFor("nothing-of-the-kind")).toBe(null)
  } finally {
    away(root)
  }
})

test("parenthood is inverted from part-slugs, and above climbs it", () => {
  const root = treeOf([
    { at: "whole.thing.ts", value: { slug: "whole", partSlugs: ["middle"] } },
    { at: "middle.thing.ts", value: { slug: "middle", partSlugs: ["leaf"] } },
    { at: "leaf.thing.ts", value: { slug: "leaf" } },
  ])
  try {
    const corpus = corpusIn(root)
    expect(corpus.parentOf(`${root}/leaf.thing.ts`)).toBe(`${root}/middle.thing.ts`)
    expect(corpus.above(`${root}/leaf.thing.ts`)).toEqual([
      `${root}/middle.thing.ts`,
      `${root}/whole.thing.ts`,
    ])
    expect(corpus.above(`${root}/whole.thing.ts`)).toEqual([])
  } finally {
    away(root)
  }
})

test("one page named a part by two wholes is refused", () => {
  const root = treeOf([
    { at: "one.thing.ts", value: { slug: "one", partSlugs: ["leaf"] } },
    { at: "two.thing.ts", value: { slug: "two", partSlugs: ["leaf"] } },
    { at: "leaf.thing.ts", value: { slug: "leaf" } },
  ])
  try {
    expect(() => corpusIn(root)).toThrow(
      /a page is a part of one whole or the tree above it is two trees/
    )
  } finally {
    away(root)
  }
})

test("a part-slugs cycle does not hang above", () => {
  const root = treeOf([
    { at: "one.thing.ts", value: { slug: "one", partSlugs: ["two"] } },
    { at: "two.thing.ts", value: { slug: "two", partSlugs: ["one"] } },
  ])
  try {
    expect(corpusIn(root).above(`${root}/one.thing.ts`)).toEqual([`${root}/two.thing.ts`])
  } finally {
    away(root)
  }
})

test("required reading and conditional reading answer with paths", () => {
  const root = treeOf([
    {
      at: "asks.thing.ts",
      value: { slug: "asks", requiredReadingSlugs: ["given"], conditionalReadingSlugs: ["maybe"] },
    },
    { at: "given.thing.ts", value: { slug: "given", definition: "what is owed" } },
    { at: "maybe.thing.ts", value: { slug: "maybe", definition: "what may be owed" } },
  ])
  try {
    const corpus = corpusIn(root)
    expect(corpus.requiredBy(`${root}/asks.thing.ts`)).toEqual([`${root}/given.thing.ts`])
    expect(corpus.conditionalBelow(`${root}/asks.thing.ts`)).toEqual([`${root}/maybe.thing.ts`])
    expect(corpus.definitionOf(`${root}/maybe.thing.ts`)).toBe("what may be owed")
  } finally {
    away(root)
  }
})

test("a file whose suffix is no page type is not a page", () => {
  const root = treeOf([{ at: "corpus.module.code.ts", value: { slug: "corpus" } }])
  try {
    expect(
      corpusIn(root)
        .every()
        .some((one) => one.slug === "corpus")
    ).toBe(false)
    expect(filedIn(root).some((one) => one.path.endsWith("corpus.module.code.ts"))).toBe(false)
  } finally {
    away(root)
  }
})

test("a page rewritten on disk is read again rather than served from the module cache", () => {
  const root = treeOf([{ at: "held.thing.ts", value: { slug: "held", definition: "what it was" } }])
  try {
    expect(corpusIn(root).definitionOf(`${root}/held.thing.ts`)).toBe("what it was")
    writeFileSync(
      `${root}/held.thing.ts`,
      `export const held = { "slug": "held", "definition": "what it became" }\n`
    )
    expect(corpusIn(root).definitionOf(`${root}/held.thing.ts`)).toBe("what it became")
  } finally {
    away(root)
  }
})

test("a corpus is built over a source that touches no filesystem", () => {
  const filed: readonly Filed[] = [
    { slug: "page", pageTypeSlug: "page-type", path: "/nowhere/page.page-type.ts" },
    { slug: "thing", pageTypeSlug: "page-type", path: "/nowhere/thing.page-type.ts" },
    { slug: "leaf", pageTypeSlug: "thing", path: "/nowhere/leaf.thing.ts" },
  ]
  const edges: Record<string, Edges> = {
    "/nowhere/page.page-type.ts": empty({ slug: "page", extendsSlug: null }),
    "/nowhere/thing.page-type.ts": empty({ slug: "thing", extendsSlug: "page" }),
    "/nowhere/leaf.thing.ts": empty({ slug: "leaf", definition: "made of nothing on disk" }),
  }
  const source: Source = {
    filed,
    edgesOf: (path) => edges[path] ?? null,
    parentOf: () => null,
  }
  const corpus = corpusOver(source)
  expect(corpus.at("/nowhere/leaf.thing.ts")?.slug).toBe("leaf")
  expect(corpus.definitionOf("/nowhere/leaf.thing.ts")).toBe("made of nothing on disk")
  expect(corpus.admits("thing", "page")).toBe(true)
  expect(corpus.resolve("leaf", "page").kind).toBe("one")
})

function empty(raw: Record<string, unknown>): Edges {
  return {
    raw,
    partSlugs: [],
    requiredReadingSlugs: [],
    conditionalReadingSlugs: [],
    definition: definitionOn(raw),
  }
}

function definitionOn(raw: Record<string, unknown>): string {
  const held = raw["definition"]
  return typeof held === "string" ? held : ""
}

test("every page filed in akasha resolves, so the folder itself builds", () => {
  const corpus = corpusIn(AKASHA)
  expect(corpus.every().length).toBeGreaterThan(40)
  for (const one of corpus.every()) {
    expect(corpus.at(one.path)).not.toBe(null)
  }
})

test("no page in akasha carries a slug another page of its own page type carries", () => {
  const corpus = corpusIn(AKASHA)
  const seen = new Map<string, string>()
  for (const one of corpus.every()) {
    const key = `${one.pageTypeSlug}/${one.slug}`
    const already = seen.get(key)
    expect(already === undefined ? one.path : `${already} and ${one.path}`).toBe(one.path)
    seen.set(key, one.path)
  }
})

test("a value naming its page type resolves where the bare slug is ambiguous", () => {
  const root = treeOf(DUP)
  try {
    const corpus = corpusIn(root)
    expect(corpus.resolve("dup", "page").kind).toBe("many")
    const one = corpus.resolve("thing/dup", "page")
    expect(one.kind).toBe("one")
    if (one.kind === "one") expect(one.at.pageTypeSlug).toBe("thing")
    const other = corpus.resolve("other/dup", "page")
    if (other.kind === "one") expect(other.at.pageTypeSlug).toBe("other")
  } finally {
    away(root)
  }
})

test("a page named by page type and slug is reached as required reading", () => {
  const root = treeOf([
    ...DUP,
    { at: "asks.thing.ts", value: { slug: "asks", requiredReadingSlugs: ["thing/dup"] } },
  ])
  try {
    const corpus = corpusIn(root)
    expect(corpus.requiredBy(`${root}/asks.thing.ts`)).toEqual([`${root}/one/dup.thing.ts`])
  } finally {
    away(root)
  }
})

test("a value naming a page type that does not carry the slug is refused", () => {
  const root = treeOf([
    ...DUP,
    { at: "asks.thing.ts", value: { slug: "asks", requiredReadingSlugs: ["deep/dup"] } },
  ])
  try {
    expect(() => corpusIn(root)).toThrow(/no page carries that slug/)
  } finally {
    away(root)
  }
})
