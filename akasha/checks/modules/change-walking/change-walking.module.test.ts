import { afterAll, expect, test } from "bun:test"
import { mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { readingIn } from "@akasha/indexes"
import { answeringOver } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { indexTakenFrom, listedFiled, pathFiled, pathsTakenFrom } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { type Shadow, shadowAt } from "@akasha/pages-system/shadow"
import {
  everyFileIn,
  everythingIn,
  FILES,
  input,
  insideAkasha,
  insideOf,
  judgingEach,
  judgingEachFile,
  onDisk,
  overEachFile,
  overEachText,
  PAGES,
  pagesTailed,
  type Selector,
  TEXTS,
  textNamed,
} from "./change-walking.module.code.ts"

const PAGE_AT = "akasha/checks-system/change-walking/held/held.module.ts"

const CODE_AT = "akasha/checks-system/change-walking/held/held.module.code.ts"

const NOTE_AT = "akasha/checks-system/change-walking/held/held.module.note.md"

const GONE_AT = "akasha/checks-system/change-walking/held/gone.module.ts"

const TYPE_AT = "akasha/checks-system/change-walking/held/held.page-type.ts"

const OUTSIDE_AT = "outside/checks-system/change-walking/held/held.module.ts"

const HELD_ID = "01a04bc4-0000-7000-8000-00000000000a"

const PAGE_TYPE = "page-type"

const MODULE = "module"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a path lies inside the akasha folder or outside it, and a change narrows to what is inside", () => {
  const nowhere = (): null => null
  const inside: Change = { root: "/nowhere", changed: [PAGE_AT], after: nowhere, before: nowhere }
  const mixed: Change = { ...inside, changed: [PAGE_AT, OUTSIDE_AT] }
  expect(insideAkasha(PAGE_AT)).toBe(true)
  expect(insideAkasha(OUTSIDE_AT)).toBe(false)
  expect(insideOf(mixed).changed).toEqual([PAGE_AT])
  expect(insideOf(inside)).toBe(inside)
})

function worldOf(paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-change-walking-")
  for (const path of paths) {
    mkdirSync(join(root, path.slice(0, path.lastIndexOf("/"))), { recursive: true })
    writeFileSync(join(root, path), `export const held = "${path}"\n`)
    pathFiled(root, path, [{ path: PAGE_AT, id: HELD_ID }])
  }
  return root
}

function mixedWorld(): Change {
  const root = scratch.rootFor("akasha-selecting-")
  writeFileSync(join(root, "here.ts"), "here")
  writeFileSync(join(root, "note.md"), "note")
  const held = onDisk(root)
  return { root, changed: ["gone.ts", "here.ts", "note.md"], after: held, before: held }
}

function pagedWorld(): Change {
  const root = scratch.rootFor("akasha-paging-")
  mkdirSync(join(root, PAGE_AT.slice(0, PAGE_AT.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, PAGE_AT), `export const held = { slug: "held" }\n`)
  writeFileSync(join(root, CODE_AT), `export const HELD = "held"\n`)
  listedFiled(root, PAGE_TYPE, MODULE, [{ path: PAGE_AT, id: HELD_ID }])
  const held = onDisk(root)
  return { root, changed: [CODE_AT, GONE_AT, PAGE_AT], after: held, before: held }
}

function tailedWorld(): Change {
  const held = pagedWorld()
  writeFileSync(join(held.root, TYPE_AT), `export const held = { slug: "held" }\n`)
  return { ...held, changed: [...held.changed, TYPE_AT] }
}

function counting(root: string, held: Shadow, asked: () => undefined): Shadow {
  const base = readingIn(root)
  const reading: Reading = {
    holds: (at) => base.holds(at),
    listing: (at) => {
      asked()
      return base.listing(at)
    },
    lines: (at) => base.lines(at),
  }
  return {
    index: answeringOver(reading, root, (path) => held.pageOf(path)),
    filed: () => held.filed(),
    pageOf: (path) => held.pageOf(path),
    codeAt: (path) => held.codeAt(path),
  }
}

test("the helper hands over each body the change leaves standing, and no path it takes away", () => {
  const root = scratch.rootFor("akasha-each-file-")
  writeFileSync(join(root, "here.ts"), "here")
  const said = overEachFile(
    { root, changed: ["gone.ts", "here.ts"], after: onDisk(root), before: onDisk(root) },
    (given) => [`${given.path} holds ${given.bytes.length} bytes`]
  )
  expect(said).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
})

test("reading each text hands the path and the body on, and passes over what is no TypeScript", () => {
  const seen: string[] = []
  const judge = overEachText((path, text) => {
    seen.push(path)
    return [`${path} says ${text.length}`]
  })
  const bytes = new TextEncoder().encode("held")
  expect(judge({ root: "/nowhere", path: "one.ts", bytes })).toEqual(["one.ts says 4"])
  expect(judge({ root: "/nowhere", path: "one.md", bytes })).toEqual([])
  expect(seen).toEqual(["one.ts"])
})

test("reading each text refuses a body that is no text at all, and names the path", () => {
  const judge = overEachText(() => ["read"])
  const bytes = Uint8Array.from([0xff, 0xfe, 0xfd])
  expect(() => judge({ root: "/nowhere", path: "one.ts", bytes })).toThrow("one.ts")
  expect(() => judge({ root: "/nowhere", path: "one.ts", bytes })).toThrow("not valid UTF-8")
})

test("judging each file makes a runner of a judge, naming the path each refusal is for", () => {
  const root = scratch.rootFor("akasha-each-run-")
  writeFileSync(join(root, "here.ts"), "here")
  const run = judgingEachFile((given) => [`${given.path} holds ${given.bytes.length} bytes`])
  const held = onDisk(root)
  expect(
    run({ root, changed: ["gone.ts", "here.ts"], after: held, before: held }, shadowAt(root))
  ).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
})

test("the files selected are the ones the change leaves standing, whatever kind of file they are", () => {
  const change = mixedWorld()
  const handed = FILES.from(change, shadowAt(change.root))
  expect(handed.map((one) => one.path)).toEqual(["here.ts", "note.md"])
})

test("the texts selected are TypeScript alone, each one handed over already read", () => {
  const change = mixedWorld()
  const handed = TEXTS.from(change, shadowAt(change.root))
  expect(handed.map((one) => one.path)).toEqual(["here.ts"])
  expect(handed.map((one) => one.text)).toEqual(["here"])
})

test("a body written with JSX is TypeScript too, so the texts take it and the pages do not", () => {
  const root = scratch.rootFor("akasha-jsx-")
  writeFileSync(join(root, "here.tsx"), "here")
  writeFileSync(join(root, "note.md"), "note")
  const held = onDisk(root)
  const change = { root, changed: ["here.tsx", "note.md"], after: held, before: held }
  const shadow = shadowAt(root)
  expect(TEXTS.from(change, shadow).map((one) => one.path)).toEqual(["here.tsx"])
  expect(TEXTS.isInput("here.tsx", shadow)).toBe(true)
  expect(TEXTS.isInput("here.md", shadow)).toBe(false)
})

test("the name of a body says whether it is read as text, and `.tsx` says it is", () => {
  expect(textNamed("one.ts")).toBe(true)
  expect(textNamed("one.tsx")).toBe(true)
  expect(textNamed("one.md")).toBe(false)
  expect(textNamed("one.css")).toBe(false)
})

test("reading each text takes a body written with JSX as readily as one written without", () => {
  const judge = overEachText((path) => [path])
  const bytes = new TextEncoder().encode("held")
  expect(judge({ root: "/nowhere", path: "one.tsx", bytes })).toEqual(["one.tsx"])
  expect(judge({ root: "/nowhere", path: "one.css", bytes })).toEqual([])
})

test("the pages selected are the standing files the index names a page type for, already loaded", () => {
  const change = pagedWorld()
  const handed = PAGES.from(change, shadowAt(change.root))
  expect(handed.map((one) => one.path)).toEqual([PAGE_AT])
  expect(handed.map((one) => one.value.value?.["slug"])).toEqual(["held"])
})

test("a file whose name tails a property rather than a page type is no page and is not selected", () => {
  const change = pagedWorld()
  const shadow = shadowAt(change.root)
  expect(PAGES.isInput(PAGE_AT, shadow)).toBe(true)
  expect(PAGES.isInput(CODE_AT, shadow)).toBe(false)
})

test("a selector tailed by one page type takes a page carrying that tail and no page carrying another", () => {
  const change = tailedWorld()
  const shadow = shadowAt(change.root)
  const tailed = pagesTailed(PAGE_TYPE)
  const handed = tailed.from(change, shadow)
  expect(PAGES.from(change, shadow).map((one) => one.path)).toEqual([PAGE_AT, TYPE_AT])
  expect(handed.map((one) => one.path)).toEqual([TYPE_AT])
  expect(tailed.isInput(TYPE_AT, shadow)).toBe(true)
  expect(tailed.isInput(PAGE_AT, shadow)).toBe(false)
})

test("a page named outside the akasha folder is no page, so no check bounded to the pages takes it", () => {
  const change = pagedWorld()
  const shadow = shadowAt(change.root)
  expect(PAGES.isInput(PAGE_AT, shadow)).toBe(true)
  expect(PAGES.isInput(OUTSIDE_AT, shadow)).toBe(false)
})

test("a page whose body declares no page is handed over all the same, carrying nothing loaded", () => {
  const change = pagedWorld()
  writeFileSync(join(change.root, PAGE_AT), "export const held = 1\n")
  const handed = PAGES.from(change, shadowAt(change.root))
  expect(handed.map((one) => one.path)).toEqual([PAGE_AT])
  expect(handed.map((one) => [one.value.value, one.value.failed])).toEqual([[null, null]])
})

test("a page whose body will not load is handed over all the same, carrying why it did not", () => {
  const change = pagedWorld()
  writeFileSync(join(change.root, PAGE_AT), "export const held = (((\n")
  const handed = PAGES.from(change, shadowAt(change.root))
  expect(handed.map((one) => one.path)).toEqual([PAGE_AT])
  expect(handed.map((one) => one.value.failed === null)).toEqual([false])
})

test("the page types are read from a shadow once, however many paths are held against it", () => {
  const change = pagedWorld()
  let asked = 0
  const shadow = counting(change.root, shadowAt(change.root), () => {
    asked = asked + 1
  })
  expect(PAGES.isInput(PAGE_AT, shadow)).toBe(true)
  expect(PAGES.isInput(CODE_AT, shadow)).toBe(false)
  expect(PAGES.from(change, shadow).map((one) => one.path)).toEqual([PAGE_AT])
  expect(asked).toBe(1)
})

test("judging each of a selection makes a runner, naming the path each refusal is for", () => {
  const change = mixedWorld()
  const run = judgingEach(TEXTS, (given) => [`${given.path} says ${given.text.length}`])
  expect(run(change, shadowAt(change.root))).toEqual([
    { path: "here.ts", reason: "here.ts says 4" },
  ])
})

test("a runner made from a selection carries the input it states, so a gate may ask before it runs", () => {
  const change = mixedWorld()
  const shadow = shadowAt(change.root)
  const run = judgingEach(TEXTS, () => [])
  expect(run.isInput("one.ts", shadow)).toBe(true)
  expect(run.isInput("one.md", shadow)).toBe(false)
})

test("an input laid on a runner wraps it, leaving the runner it was handed carrying none", () => {
  const change = mixedWorld()
  const shadow = shadowAt(change.root)
  const run = (held: Change) => [{ path: held.changed[0] ?? "", reason: "said" }]
  const bound = input(TEXTS, run)
  expect(Object.hasOwn(run, "isInput")).toBe(false)
  expect(Object.hasOwn(bound, "isInput")).toBe(true)
  expect(bound.isInput("one.ts", shadow)).toBe(true)
  expect(bound.isInput("one.md", shadow)).toBe(false)
  expect(bound(change, shadow)).toEqual([{ path: "gone.ts", reason: "said" }])
})

test("the judge of a selection is handed the index the change leaves, so it may ask of it", () => {
  const change = mixedWorld()
  const seen: string[] = []
  const run = judgingEach(TEXTS, (given, shadow) => {
    seen.push(typeof shadow.index.everyPath)
    return [given.path]
  })
  expect(run(change, shadowAt(change.root)).length).toBe(1)
  expect(seen).toEqual(["function"])
})

test("a selector takes as input every path it hands over, so no path it judges passes a gate unseen", () => {
  const change = pagedWorld()
  const shadow = shadowAt(change.root)
  const every: readonly Selector<{ readonly path: string }>[] = [
    FILES,
    TEXTS,
    PAGES,
    pagesTailed(MODULE),
  ]
  for (const selector of every) {
    const handed = selector.from(change, shadow)
    expect(handed.length).toBeGreaterThan(0)
    for (const given of handed) expect(selector.isInput(given.path, shadow)).toBe(true)
  }
})

test("a walk takes a page and the files its own properties imply", () => {
  expect(everyFileIn(readingIn(worldOf([PAGE_AT, CODE_AT])))).toEqual([CODE_AT, PAGE_AT])
})

test("a walk takes the paths the index files, and works none of them out from a property name", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  pathFiled(root, NOTE_AT, [{ path: PAGE_AT, id: HELD_ID }])
  expect(everyFileIn(readingIn(root))).toContain(NOTE_AT)
})

test("a walk reads no page module to work out what stands, so a page it cannot load is still taken", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  writeFileSync(join(root, PAGE_AT), "this is not typescript at all (((\n")
  expect(everyFileIn(readingIn(root))).toContain(CODE_AT)
})

test("a walk over everything reads the body of every file it takes", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  const change = everythingIn(root)
  expect(change.root).toBe(root)
  expect(change.changed).toEqual([CODE_AT, PAGE_AT])
  for (const path of change.changed) expect(change.after(path)).not.toBeNull()
})

test("an index standing nowhere cannot answer which files stand, so it refuses rather than taking nothing", () => {
  const root = worldOf([PAGE_AT])
  indexTakenFrom(root)
  expect(() => everyFileIn(readingIn(root))).toThrow("could not be answered")
  expect(() => everythingIn(root)).toThrow("is not an index naming none")
})

test("a path directory gone from an index that stands is a true empty rather than a refusal", () => {
  const root = worldOf([PAGE_AT])
  pathsTakenFrom(root)
  expect(everyFileIn(readingIn(root))).toEqual([])
})

const HANDED: Reading = {
  holds: (at) => at === "",
  listing: (at) => {
    if (at === "path") return [{ name: "akasha", directory: true }]
    if (at === "path/akasha") return [{ name: "held.ts.jsonl", directory: false }]
    return []
  },
  lines: () => [],
}

test("a reading handed in says which files stand, so a check may ask of the index it will leave", () => {
  expect(everyFileIn(HANDED)).toEqual(["akasha/held.ts"])
})

test("a body that will not open refuses the check reading it rather than reading as nothing", () => {
  const root = scratch.rootFor("akasha-on-disk-")
  symlinkSync("b.ts", join(root, "a.ts"))
  symlinkSync("a.ts", join(root, "b.ts"))
  expect(() => onDisk(root)("a.ts")).toThrow("ELOOP")
})

const HANDED_COLD: Reading = { holds: () => false, listing: () => [], lines: () => [] }

test("a reading handed in that stands nowhere is refused as a root standing nowhere is", () => {
  expect(() => everyFileIn(HANDED_COLD)).toThrow("could not be answered")
})
