import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Corpus } from "./corpus.module.code.ts"
import { corpusIn } from "./corpus.module.code.ts"
import type { Change, Held, Indexing, Landing, Refusal } from "./landing.module.code.ts"
import { authoring, carrying, creating, land, refused, takingAway } from "./landing.module.code.ts"
import { bodiesAt, oidOf, recordAt } from "./reading.module.code.ts"
import { closureFor } from "./required-reading.module.code.ts"

type Held_ = { readonly at: string; readonly value: Record<string, unknown> }

const SPINE: readonly Held_[] = [
  { at: "page.page-type.ts", value: { slug: "page", extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { slug: "page-type", extendsSlug: "page" } },
  {
    at: "page-property-type.page-type.ts",
    value: { slug: "page-property-type", extendsSlug: "page" },
  },
  { at: "thing.page-type.ts", value: { slug: "thing", extendsSlug: "page" } },
  {
    at: "page-slug.page-property-type.ts",
    value: { slug: "page-slug", kind: "relation", targetPageTypeSlug: "page" },
  },
  {
    at: "part-slugs.page-property-type.ts",
    value: { slug: "part-slugs", kind: "list", entrySlug: "page-slug" },
  },
  { at: "definition.page-property-type.ts", value: { slug: "definition", kind: "text" } },
  { at: "whole.thing.ts", value: { slug: "whole", partSlugs: ["leaf"] } },
  { at: "leaf.thing.ts", value: { slug: "leaf", definition: "what is written on" } },
]

let count = 0

type Stage = {
  readonly root: string
  readonly corpus: Corpus
  readonly held: Held
  readonly wrote: { path: string; body: string; before: string | null }[]
  readonly took: { path: string; before: string | null }[]
  readonly settled: () => number
}

function stage(): Stage {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-landing-${count}-`)
  for (const one of SPINE) {
    const at = `${root}/${one.at}`
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(at, `export const ${key} = ${JSON.stringify(one.value, null, 2)}\n`)
  }
  const corpus = corpusIn(root)
  const wrote: { path: string; body: string; before: string | null }[] = []
  const took: { path: string; before: string | null }[] = []
  let settles = 0
  const index: Indexing = {
    wrote: (path, body, before) => void wrote.push({ path, body, before }),
    took: (path, before) => void took.push({ path, before }),
    settle: () => {
      settles += 1
    },
  }
  const held: Held = {
    corpus,
    record: recordAt(`${root}/record.json`),
    writer: "athena",
    index,
    bodies: bodiesAt(`${root}/bodies`),
    readAs: "ops akasha read",
  }
  return { root, corpus, held, wrote, took, settled: () => settles }
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

function readEverythingOwed(path: string, stood: Stage): void {
  for (const owed of closureFor(path, stood.corpus)) {
    stood.held.record.keep(owed, oidOf(readFileSync(owed, "utf8")), Date.now())
  }
}

function readAlso(path: string, stood: Stage): void {
  stood.held.record.keep(path, oidOf(readFileSync(path, "utf8")), Date.now())
}

function said(one: Landing | Refusal): string {
  return refused(one) ? one.refused : ""
}

test("a body written over nothing is refused as a creation, not a write", () => {
  const stood = stage()
  try {
    const what = authoring(`${stood.root}/absent.thing.ts`, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a body written over nothing is a creation, not a write")
  } finally {
    away(stood.root)
  }
})

test("a body written over one that stands is refused as a write, not a creation", () => {
  const stood = stage()
  try {
    const what = creating(`${stood.root}/leaf.thing.ts`, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a body written over one already there is a write, not a creation")
  } finally {
    away(stood.root)
  }
})

test("writing a file nothing says you read is refused, and the refusal names the read", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("You have not read")
    expect(said(what)).toContain(`--file-path ${at}`)
  } finally {
    away(stood.root)
  }
})

test("writing a file that moved after you read it is refused", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    writeFileSync(at, `export const leaf = { "slug": "leaf", "definition": "moved" }\n`)
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("changed after you read it")
  } finally {
    away(stood.root)
  }
})

test("writing a file whose required reading is short is refused, and each is named", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("nothing on record says you have read")
    for (const owed of closureFor(at, stood.corpus)) {
      expect(said(what)).toContain(owed)
    }
  } finally {
    away(stood.root)
  }
})

test("a write with both obligations discharged is a landing carrying what it was built from", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const what = authoring(at, "the new body", stood.held)
    expect(refused(what)).toBe(false)
    if (refused(what)) return
    expect(what.kind).toBe("write")
    expect(what.path).toBe(at)
    expect(what.body).toBe("the new body")
    expect(what.by).toBe("athena")
    expect(what.prior).toBe(oidOf(readFileSync(at, "utf8")))
  } finally {
    away(stood.root)
  }
})

test("a creation carries no prior, because there was nothing before it", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    authoring(at, "x", stood.held)
    const what = creating(`${stood.root}/new.thing.ts`, "made", stood.held)
    expect(refused(what)).toBe(false)
    if (refused(what)) return
    expect(what.prior).toBe(null)
    expect(what.body).toBe("made")
  } finally {
    away(stood.root)
  }
})

test("carrying takes the body of the file it comes from, and refuses where there is none", () => {
  const stood = stage()
  try {
    const gone = carrying(`${stood.root}/absent.thing.ts`, `${stood.root}/to.thing.ts`, stood.held)
    expect(refused(gone)).toBe(true)
    expect(said(gone)).toContain("nothing can be carried from it")
    const what = carrying(`${stood.root}/leaf.thing.ts`, `${stood.root}/to.thing.ts`, stood.held)
    expect(refused(what)).toBe(false)
    if (refused(what)) return
    expect(what.body).toBe(readFileSync(`${stood.root}/leaf.thing.ts`, "utf8"))
    expect(what.path).toBe(`${stood.root}/to.thing.ts`)
  } finally {
    away(stood.root)
  }
})

test("landing a write puts the body on disk, records it read, keeps it, and tells the index", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const what = authoring(at, "the new body", stood.held)
    if (refused(what)) throw new Error(what.refused)
    expect(land([what], stood.held)).toEqual([at])
    expect(readFileSync(at, "utf8")).toBe("the new body")
    expect(stood.held.record.of(at)).toEqual({
      oid: oidOf("the new body"),
      seenAt: expect.any(Number),
    })
    expect(stood.held.bodies.of(oidOf("the new body"))).toBe("the new body")
    expect(stood.wrote.map((one) => one.path)).toEqual([at])
    expect(stood.settled()).toBe(1)
  } finally {
    away(stood.root)
  }
})

test("a file that moved between the witness and the landing is refused, and nothing is written", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const what = authoring(at, "the new body", stood.held)
    if (refused(what)) throw new Error(what.refused)
    writeFileSync(at, "somebody else got here first")
    expect(() => land([what], stood.held)).toThrow(/is not as the witness says it was/)
    expect(readFileSync(at, "utf8")).toBe("somebody else got here first")
    expect(stood.wrote).toEqual([])
  } finally {
    away(stood.root)
  }
})

test("landing a removal takes the file away and tells the index it went", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    const what = takingAway(at, stood.held)
    expect(what.kind).toBe("remove")
    expect(land([what], stood.held)).toEqual([at])
    expect(existsSync(at)).toBe(false)
    expect(stood.took.map((one) => one.path)).toEqual([at])
    expect(stood.wrote).toEqual([])
  } finally {
    away(stood.root)
  }
})

test("the index is settled once for a landing of many changes, not once for each", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const one = authoring(at, "first", stood.held)
    const two = creating(`${stood.root}/new.thing.ts`, "second", stood.held)
    if (refused(one) || refused(two)) throw new Error("witness refused")
    const all: readonly Change[] = [one, two]
    expect(land(all, stood.held)).toHaveLength(2)
    expect(stood.settled()).toBe(1)
    expect(stood.wrote).toHaveLength(2)
  } finally {
    away(stood.root)
  }
})

test("a path the corpus does not carry owes no required reading", () => {
  const stood = stage()
  const at = `${stood.root}/notes.txt`
  try {
    writeFileSync(at, "not a page")
    readAlso(at, stood)
    const what = authoring(at, "still not a page", stood.held)
    expect(refused(what)).toBe(false)
  } finally {
    away(stood.root)
  }
})

test("a seat cleared for a document stays cleared within the one record it was cleared on", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    expect(refused(authoring(at, "first", stood.held))).toBe(false)
    const owed = closureFor(at, stood.corpus)[0]
    if (owed === undefined) throw new Error("nothing owed to move")
    writeFileSync(owed, `${readFileSync(owed, "utf8")}\n`)
    expect(refused(authoring(at, "second", stood.held))).toBe(false)
  } finally {
    away(stood.root)
  }
})

test("the index is handed the body that stood before the one written over it", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  const was = readFileSync(at, "utf8")
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const what = authoring(at, "the new body", stood.held)
    if (refused(what)) throw new Error(what.refused)
    land([what], stood.held)
    expect(stood.wrote[0]?.before).toBe(was)
    expect(stood.wrote[0]?.body).toBe("the new body")
  } finally {
    away(stood.root)
  }
})

test("the index is handed nothing before a creation, there having been nothing", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  try {
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    authoring(at, "x", stood.held)
    const what = creating(`${stood.root}/new.thing.ts`, "made", stood.held)
    if (refused(what)) throw new Error(what.refused)
    land([what], stood.held)
    expect(stood.wrote[0]?.before).toBe(null)
  } finally {
    away(stood.root)
  }
})

test("the index is handed the body a removal took away, before it went", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  const was = readFileSync(at, "utf8")
  try {
    land([takingAway(at, stood.held)], stood.held)
    expect(stood.took[0]?.before).toBe(was)
  } finally {
    away(stood.root)
  }
})

test("a prior body too large for the body store still reaches the index whole", () => {
  const stood = stage()
  const at = `${stood.root}/leaf.thing.ts`
  const huge = `export const leaf = { "slug": "leaf", "definition": "${"x".repeat(40_000)}" }\n`
  try {
    writeFileSync(at, huge)
    readAlso(at, stood)
    readEverythingOwed(at, stood)
    const what = authoring(at, "small now", stood.held)
    if (refused(what)) throw new Error(what.refused)
    land([what], stood.held)
    expect(stood.held.bodies.of(oidOf(huge))).toBe(null)
    expect(stood.wrote[0]?.before).toBe(huge)
  } finally {
    away(stood.root)
  }
})

test("a carry onto a path that stands is refused, because the witness would be lying", () => {
  const stood = stage()
  const to = `${stood.root}/whole.thing.ts`
  const was = readFileSync(to, "utf8")
  try {
    const what = carrying(`${stood.root}/leaf.thing.ts`, to, stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a carry witnesses that nothing was")
    expect(said(what)).toContain(`--file-path ${to}`)
    expect(readFileSync(to, "utf8")).toBe(was)
  } finally {
    away(stood.root)
  }
})

test("a carry onto a path that stands is refused however well read the seat is", () => {
  const stood = stage()
  const to = `${stood.root}/whole.thing.ts`
  try {
    readAlso(to, stood)
    readEverythingOwed(to, stood)
    expect(refused(carrying(`${stood.root}/leaf.thing.ts`, to, stood.held))).toBe(true)
  } finally {
    away(stood.root)
  }
})
