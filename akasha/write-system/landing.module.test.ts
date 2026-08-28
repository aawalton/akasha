import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { corpusIn } from "./corpus.module.code.ts"
import type { Held, Indexing, Judged, Landing, Leaving, Refusal } from "./landing.module.code.ts"
import { authoring, carrying, creating, land, refused, takingAway } from "./landing.module.code.ts"
import { bodiesAt, oidOf, recordAt } from "./reading.module.code.ts"
import { closureFor } from "./required-reading.module.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-property-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "thing.page-type.ts", value: { extendsSlug: "page" } },
  {
    at: "page-slug.page-property-type.ts",
    value: { kind: "relation", targetPageTypeSlug: "page" },
  },
  { at: "part-slugs.page-property-type.ts", value: { kind: "list", entrySlug: "page-slug" } },
  { at: "definition.page-property-type.ts", value: { kind: "text" } },
  { at: "whole.thing.ts", value: { partSlugs: ["leaf"] } },
  { at: "leaf.thing.ts", value: { definition: "what is written on" } },
]

let count = 0

type Stage = ReturnType<typeof stage>

function stage() {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-landing-${count}-`)
  for (const one of SPINE) {
    const at = `${root}/${one.at}`
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    const body = JSON.stringify({ slug: named, ...one.value }, null, 2)
    writeFileSync(at, `export const ${key} = ${body}\n`)
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
    judge: { named: [], over: () => [] },
    root,
  }
  return { root, corpus, held, wrote, took, settled: () => settles }
}

function readAlso(path: string, stood: Stage): void {
  stood.held.record.keep(path, oidOf(readFileSync(path, "utf8")), Date.now())
}

function ready(stood: Stage, path: string): void {
  readAlso(path, stood)
  for (const owed of closureFor(path, stood.corpus)) readAlso(owed, stood)
}

function must(one: Landing | Refusal): Landing {
  if (refused(one)) throw new Error(one.refused)
  return one
}

function inTree(run: (stood: Stage) => void): void {
  const stood = stage()
  try {
    run(stood)
  } finally {
    rmSync(stood.root, { recursive: true, force: true })
  }
}

function landed(what: ReturnType<typeof land>): readonly string[] {
  if (what.kind !== "landed") throw new Error("the checks refused this")
  return what.paths
}

function said(one: Landing | Refusal): string {
  return refused(one) ? one.refused : ""
}

function text(bytes: Uint8Array | null): string {
  if (bytes === null) throw new Error("nothing was there to read")
  return Buffer.from(bytes).toString("utf8")
}

function judging(named: readonly string[], over: (leaving: Leaving) => readonly Judged[]) {
  return { named, over }
}

test("a body written over nothing is refused as a creation, not a write", () =>
  inTree((stood) => {
    const what = authoring(`${stood.root}/absent.thing.ts`, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a body written over nothing is a creation, not a write")
  }))

test("a body written over one already there is refused as a write, not a creation", () =>
  inTree((stood) => {
    const what = creating(`${stood.root}/leaf.thing.ts`, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a body written over one already there is a write, not a creation")
  }))

test("writing a file nothing says you read is refused, and the refusal names the read", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("You have not read")
    expect(said(what)).toContain(`--file-path ${at}`)
  }))

test("writing a file that moved after you read it is refused", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    readAlso(at, stood)
    writeFileSync(at, `export const leaf = { "slug": "leaf", "definition": "moved" }\n`)
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("changed after you read it")
  }))

test("writing a file whose required reading is short is refused, and each is named", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    readAlso(at, stood)
    const what = authoring(at, "x", stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("nothing on record says you have read")
    for (const owed of closureFor(at, stood.corpus)) {
      expect(said(what)).toContain(owed)
    }
  }))

test("a write with both obligations discharged is a landing carrying what it was built from", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    const what = must(authoring(at, "the new body", stood.held))
    expect(what.kind).toBe("write")
    expect(what.path).toBe(at)
    expect(what.body).toBe("the new body")
    expect(what.by).toBe("athena")
    expect(what.prior).toBe(oidOf(readFileSync(at, "utf8")))
  }))

test("a creation carries no prior, because there was nothing before it", () =>
  inTree((stood) => {
    ready(stood, `${stood.root}/leaf.thing.ts`)
    const what = must(creating(`${stood.root}/new.thing.ts`, "made", stood.held))
    expect(what.prior).toBe(null)
    expect(what.body).toBe("made")
  }))

test("carrying takes the body of the file it comes from, and refuses where there is none", () =>
  inTree((stood) => {
    const gone = carrying(`${stood.root}/absent.thing.ts`, `${stood.root}/to.thing.ts`, stood.held)
    expect(refused(gone)).toBe(true)
    expect(said(gone)).toContain("nothing can be carried from it")
    const what = must(
      carrying(`${stood.root}/leaf.thing.ts`, `${stood.root}/to.thing.ts`, stood.held)
    )
    expect(what.body).toBe(readFileSync(`${stood.root}/leaf.thing.ts`, "utf8"))
    expect(what.path).toBe(`${stood.root}/to.thing.ts`)
  }))

test("landing a write puts the body on disk, records it read, keeps it, and tells the index", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    const what = must(authoring(at, "the new body", stood.held))
    expect(landed(land([what], stood.held))).toEqual([at])
    expect(readFileSync(at, "utf8")).toBe("the new body")
    expect(stood.held.record.of(at)).toEqual({
      oid: oidOf("the new body"),
      seenAt: expect.any(Number),
    })
    expect(stood.held.bodies.of(oidOf("the new body"))).toBe("the new body")
    expect(stood.wrote.map((one) => one.path)).toEqual([at])
    expect(stood.settled()).toBe(1)
  }))

test("a file that moved between the witness and the landing is refused, and nothing is written", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    const what = must(authoring(at, "the new body", stood.held))
    writeFileSync(at, "somebody else got here first")
    expect(() => land([what], stood.held)).toThrow(/is not as the witness says it was/)
    expect(readFileSync(at, "utf8")).toBe("somebody else got here first")
    expect(stood.wrote).toEqual([])
  }))

test("landing a removal takes the file away and tells the index it went", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const what = takingAway(at, stood.held)
    expect(what.kind).toBe("remove")
    expect(landed(land([what], stood.held))).toEqual([at])
    expect(existsSync(at)).toBe(false)
    expect(stood.took.map((one) => one.path)).toEqual([at])
    expect(stood.wrote).toEqual([])
  }))

test("the index is settled once for a landing of many changes, not once for each", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    const one = must(authoring(at, "first", stood.held))
    const two = must(creating(`${stood.root}/new.thing.ts`, "second", stood.held))
    expect(landed(land([one, two], stood.held))).toHaveLength(2)
    expect(stood.settled()).toBe(1)
    expect(stood.wrote).toHaveLength(2)
  }))

test("a path the corpus does not carry owes no required reading", () =>
  inTree((stood) => {
    const at = `${stood.root}/notes.txt`
    writeFileSync(at, "not a page")
    readAlso(at, stood)
    expect(refused(authoring(at, "still not a page", stood.held))).toBe(false)
  }))

test("a seat cleared for a document stays cleared within the one record it was cleared on", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    expect(refused(authoring(at, "first", stood.held))).toBe(false)
    const owed = closureFor(at, stood.corpus)[0]
    if (owed === undefined) throw new Error("nothing owed to move")
    writeFileSync(owed, `${readFileSync(owed, "utf8")}\n`)
    expect(refused(authoring(at, "second", stood.held))).toBe(false)
  }))

test("the index is handed the body that was there before the one written over it", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const was = readFileSync(at, "utf8")
    ready(stood, at)
    land([must(authoring(at, "the new body", stood.held))], stood.held)
    expect(stood.wrote[0]?.before).toBe(was)
    expect(stood.wrote[0]?.body).toBe("the new body")
  }))

test("the index is handed nothing before a creation, there having been nothing", () =>
  inTree((stood) => {
    ready(stood, `${stood.root}/leaf.thing.ts`)
    const what = must(creating(`${stood.root}/new.thing.ts`, "made", stood.held))
    land([what], stood.held)
    expect(stood.wrote[0]?.before).toBe(null)
  }))

test("the index is handed the body a removal took away, before it went", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const was = readFileSync(at, "utf8")
    land([takingAway(at, stood.held)], stood.held)
    expect(stood.took[0]?.before).toBe(was)
  }))

test("a prior body too large for the body store still reaches the index whole", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const huge = `export const leaf = { "slug": "leaf", "definition": "${"x".repeat(40_000)}" }\n`
    writeFileSync(at, huge)
    ready(stood, at)
    land([must(authoring(at, "small now", stood.held))], stood.held)
    expect(stood.held.bodies.of(oidOf(huge))).toBe(null)
    expect(stood.wrote[0]?.before).toBe(huge)
  }))

test("a carry onto an occupied path is refused, because the witness would be lying", () =>
  inTree((stood) => {
    const to = `${stood.root}/whole.thing.ts`
    const was = readFileSync(to, "utf8")
    const what = carrying(`${stood.root}/leaf.thing.ts`, to, stood.held)
    expect(refused(what)).toBe(true)
    expect(said(what)).toContain("a carry witnesses that nothing was")
    expect(said(what)).toContain(`--file-path ${to}`)
    expect(readFileSync(to, "utf8")).toBe(was)
  }))

test("a carry onto an occupied path is refused however well read the seat is", () =>
  inTree((stood) => {
    const to = `${stood.root}/whole.thing.ts`
    ready(stood, to)
    expect(refused(carrying(`${stood.root}/leaf.thing.ts`, to, stood.held))).toBe(true)
  }))

test("a check refusing the change lands nothing, and the refusal is an answer not a throw", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const was = readFileSync(at, "utf8")
    ready(stood, at)
    const what = must(authoring(at, "the new body", stood.held))
    const judge = judging(["never-happy"], () => [
      { path: at, reason: "this one is never allowed" },
    ])
    const done = land([what], { ...stood.held, judge })
    expect(done.kind).toBe("refused")
    if (done.kind !== "refused") return
    expect(done.by[0]?.reason).toBe("this one is never allowed")
    expect(readFileSync(at, "utf8")).toBe(was)
    expect(stood.wrote).toEqual([])
  }))

test("what a check is shown is the bytes the change would leave, not the tree on disk", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    const gone = `${stood.root}/whole.thing.ts`
    const raw = Buffer.from([0xff, 0xfe, 0x00, 0x01, 0x80, 0x41])
    writeFileSync(`${stood.root}/icon.bin`, raw)
    ready(stood, at)
    const one = must(authoring(at, "what it becomes", stood.held))
    let seen: Leaving | null = null
    const judge = judging(["watcher"], (leaving) => {
      seen = leaving
      return []
    })
    land([one, takingAway(gone, stood.held)], { ...stood.held, judge })
    const held = seen as Leaving | null
    if (held === null) throw new Error("the checks were never consulted")
    expect(text(held.at(at))).toBe("what it becomes")
    expect(held.at(gone)).toBe(null)
    expect(text(held.at(`${stood.root}/page.page-type.ts`))).toContain("slug")
    expect(Buffer.from(held.at(`${stood.root}/icon.bin`) ?? [])).toEqual(raw)
    expect(held.changed).toEqual([at, gone].sort())
    expect(held.root).toBe(stood.root)
  }))

test("the checks are consulted before any witness is verified, so a refusal never half-lands", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    const what = must(authoring(at, "the new body", stood.held))
    writeFileSync(at, "somebody else got here first")
    const judge = judging(["never-happy"], () => [{ path: at, reason: "no" }])
    expect(land([what], { ...stood.held, judge }).kind).toBe("refused")
    expect(readFileSync(at, "utf8")).toBe("somebody else got here first")
  }))

test("a landing says which checks it consulted, so an empty set cannot read as a passing one", () =>
  inTree((stood) => {
    const at = `${stood.root}/leaf.thing.ts`
    ready(stood, at)
    expect(land([must(authoring(at, "first", stood.held))], stood.held).consulted).toEqual([])
    const both = { ...stood.held, judge: judging(["a", "b"], () => []) }
    expect(land([must(authoring(at, "second", both))], both).consulted).toEqual(["a", "b"])
  }))
