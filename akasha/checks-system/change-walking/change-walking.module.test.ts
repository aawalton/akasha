import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import {
  pathFiled,
  pathsTakenFrom,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { shadowAt } from "../../pages-system/shadow/shadow.module.code.ts"
import {
  everyFileIn,
  everythingIn,
  judgingEachFile,
  onDisk,
  overEachFile,
  overEachText,
} from "./change-walking.module.code.ts"

const PAGE_AT = "akasha/checks-system/change-walking/held/held.module.ts"

const CODE_AT = "akasha/checks-system/change-walking/held/held.module.code.ts"

const NOTE_AT = "akasha/checks-system/change-walking/held/held.module.note.md"

const HELD_ID = "01a04bc4-0000-7000-8000-00000000000a"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldOf(paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-change-walking-")
  for (const path of paths) {
    mkdirSync(join(root, path.slice(0, path.lastIndexOf("/"))), { recursive: true })
    writeFileSync(join(root, path), `export const held = "${path}"\n`)
    pathFiled(root, path, [{ path: PAGE_AT, id: HELD_ID }])
  }
  return root
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

test("reading each text passes over a body that is no text at all", () => {
  const judge = overEachText(() => ["read"])
  const bytes = Uint8Array.from([0xff, 0xfe, 0xfd])
  expect(judge({ root: "/nowhere", path: "one.ts", bytes })).toEqual([])
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

test("a walk takes a page and the files its own properties imply", () => {
  expect(everyFileIn(worldOf([PAGE_AT, CODE_AT]))).toEqual([CODE_AT, PAGE_AT])
})

test("a walk takes the paths the index files, and works none of them out from a property name", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  pathFiled(root, NOTE_AT, [{ path: PAGE_AT, id: HELD_ID }])
  expect(everyFileIn(root)).toContain(NOTE_AT)
})

test("a walk reads no page module to work out what stands, so a page it cannot load is still taken", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  writeFileSync(join(root, PAGE_AT), "this is not typescript at all (((\n")
  expect(everyFileIn(root)).toContain(CODE_AT)
})

test("a walk over everything reads the body of every file it takes", () => {
  const root = worldOf([PAGE_AT, CODE_AT])
  const change = everythingIn(root)
  expect(change.root).toBe(root)
  expect(change.changed).toEqual([CODE_AT, PAGE_AT])
  for (const path of change.changed) expect(change.after(path)).not.toBeNull()
})

test("an index holding no path directory cannot answer, so the walk refuses rather than taking nothing", () => {
  const root = worldOf([PAGE_AT])
  pathsTakenFrom(root)
  expect(() => everyFileIn(root)).toThrow("could not be answered")
  expect(() => everythingIn(root)).toThrow("is not an index naming none")
})

const HANDED: Reading = {
  holds: () => false,
  listing: (at) => {
    if (at === "path") return [{ name: "akasha", directory: true }]
    if (at === "path/akasha") return [{ name: "held.ts.jsonl", directory: false }]
    return []
  },
  lines: () => [],
}

test("a reading handed in says which files stand, so a check may ask of the index it will leave", () => {
  expect(everyFileIn(worldOf([PAGE_AT]), HANDED)).toEqual(["akasha/held.ts"])
})

test("a reading handed in does not stand in for the guard, which is on the root and stays", () => {
  const root = worldOf([PAGE_AT])
  pathsTakenFrom(root)
  expect(() => everyFileIn(root, HANDED)).toThrow("could not be answered")
})
