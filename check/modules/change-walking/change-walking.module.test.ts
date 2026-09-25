import { afterAll, expect, test } from "bun:test"
import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  FILES,
  input,
  judgingEach,
  loadedExportsSparing,
  overEachFile,
  overEachText,
  PAGES,
  pagesTailed,
  type Selector,
  TEXTS,
  textNamed,
  textWas,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  AGENT,
  CODE_AT,
  counting,
  loadedWorld,
  MODULE,
  mixedWorld,
  PAGE_AT,
  PAGE_TYPE,
  pagedWorld,
  scratch,
  TYPE_AT,
  tailedWorld,
  watchedWorld,
} from "akasha/check/modules/change-walking/change-walking.module.test-fixtures.ts"
import { onDisk } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("the names spared beside a page are the ones that page's type states its loader reads", () => {
  expect(loadedExportsSparing(loadedWorld(["runChange", "takes"]))).toEqual(
    new Map([[AGENT, new Set(["runChange", "takes"])]])
  )
})

test("a page type stating no loaded export spares no name at all beside its pages", () => {
  expect(loadedExportsSparing(loadedWorld(null))).toEqual(new Map())
})

test("the helper hands over each body the change leaves standing, and no path it takes away", () => {
  const root = scratch.rootFor("akasha-each-file-")
  writeFileSync(join(root, "here.ts"), "here")
  const said = overEachFile(
    { root, changed: ["gone.ts", "here.ts"], after: onDisk(root), before: onDisk(root) },
    () => true,
    (given) => [`${given.path} holds ${given.bytes.length} bytes`]
  )
  expect(said).toEqual([{ path: "here.ts", reason: "here.ts holds 4 bytes" }])
})

test("a walk over each file opens a path it takes and never opens one its judge would drop", () => {
  const opened: string[] = []
  const change = watchedWorld(opened)
  const said = overEachFile(change, textNamed, (given) => [given.path])
  expect(said).toEqual([{ path: "here.ts", reason: "here.ts" }])
  expect(opened).toEqual(["here.ts"])
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

test("the body a change took away is read as the text a check judges", () => {
  const root = scratch.rootFor("akasha-text-was-")
  writeFileSync(join(root, "was.ts"), "was")
  const gone = { root, changed: ["was.ts"], after: () => null, before: onDisk(root) }
  expect(textWas(gone, "was.ts")).toBe("was")
  expect(textWas(gone, "none.ts")).toBeNull()
})

test("the files selected are the ones the change leaves standing, whatever kind of file they are", () => {
  const change = mixedWorld()
  const handed = [...FILES.from(change, shadowAt(change.root))]
  expect(handed.map((one) => one.path)).toEqual(["here.ts", "note.md"])
})

test("the texts selected are TypeScript alone, each one handed over already read", () => {
  const change = mixedWorld()
  const handed = [...TEXTS.from(change, shadowAt(change.root))]
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
  expect([...TEXTS.from(change, shadow)].map((one) => one.path)).toEqual(["here.tsx"])
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
  const handed = [...PAGES.from(change, shadowAt(change.root))]
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
  const handed = [...tailed.from(change, shadow)]
  expect([...PAGES.from(change, shadow)].map((one) => one.path)).toEqual([PAGE_AT, TYPE_AT])
  expect(handed.map((one) => one.path)).toEqual([TYPE_AT])
  expect(tailed.isInput(TYPE_AT, shadow)).toBe(true)
  expect(tailed.isInput(PAGE_AT, shadow)).toBe(false)
})

test("a page whose body will not load is handed over all the same, carrying why it did not", () => {
  const change = pagedWorld()
  writeFileSync(join(change.root, PAGE_AT), "export const held = (((\n")
  const handed = [...PAGES.from(change, shadowAt(change.root))]
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
  const once = asked
  expect(PAGES.isInput(CODE_AT, shadow)).toBe(false)
  expect([...PAGES.from(change, shadow)].map((one) => one.path)).toEqual([PAGE_AT])
  expect(asked).toBe(once)
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
  expect(bound({ ...change, changed: ["note.md"] }, shadow)).toEqual([])
})

test("the judge of a selection is handed the index the change leaves, so it may ask of it", () => {
  const change = mixedWorld()
  const seen: string[] = []
  const run = judgingEach(TEXTS, (given, shadow) => {
    seen.push(typeof shadow.index.everyOfType)
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
    const handed = [...selector.from(change, shadow)]
    expect(handed.length).toBeGreaterThan(0)
    for (const given of handed) expect(selector.isInput(given.path, shadow)).toBe(true)
  }
})

test("a body that will not open refuses the check reading it rather than reading as nothing", () => {
  const root = scratch.rootFor("akasha-on-disk-")
  symlinkSync("b.ts", join(root, "a.ts"))
  symlinkSync("a.ts", join(root, "b.ts"))
  expect(() => onDisk(root)("a.ts")).toThrow("ELOOP")
})
