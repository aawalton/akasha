import { expect, test } from "bun:test"
import {
  type Asked,
  runChange,
} from "akasha/changes/mechanical/file/add/add-file/add-file.change-mechanical-file.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "akasha/one.held.ts"

function ranOn(held: Readonly<Record<string, string>>, given: Asked): Answer {
  return runChange(worldOf(held), given)
}

test("a path already holding the body given is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "alpha\n" }, { at: AT, body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already holds this body/)
})

test("a path holding no body states an add holding the path and the content", () => {
  const said = runChange(worldOf({}), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: AT, content: "alpha\n" }])
})

test("a path holding another body states a replace holding the whole body each side", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "alpha\n", contentTo: "beta\n" },
  ])
})

test("a body composed against the body there states the replace as it would without", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "alpha\n", contentTo: "beta\n" },
  ])
})

test("a body composed against a body that is not there is refused and answers no edit", () => {
  const said = runChange(worldOf({ [AT]: "moved\n" }), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/moved since the body handed in was composed/)
})

test("a body composed against nothing stated writes over whatever is there", () => {
  const said = runChange(worldOf({ [AT]: "moved\n" }), { at: AT, body: "beta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "moved\n", contentTo: "beta\n" },
  ])
})

const ENTRIES = "akasha/one.thing.cases.jsonl"

const ENTRY_LINE = '{"case": "one"}\n'

const HELD_ENTRY = '{"id": "01a07bd4-3a11-708f-ad12-c22715ac9f9c", "case": "held"}\n'

const MINTED =
  /\{"id":"[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}","case":"one"\}/

const SHAPES: ReadonlySet<string> = new Set(["cases"])

const NO_TYPES: ReadonlySet<string> = new Set()

const KEYS = new Map([["cases", "jsonl"]])

function entriedWorld(held: Readonly<Record<string, string>>): World {
  return {
    ...worldOf(held),
    index: Object.assign({} as World["index"], {
      everyPath: () => Object.keys(held),
      entryShapesAt: () => SHAPES,
      pageTypesIn: () => NO_TYPES,
      fileKeysAt: () => KEYS,
    }),
  }
}

function contentIn(said: Answer): string {
  const one = said.edits[0]
  if (one === undefined) return ""
  if (one.kind === "add") return one.content
  return one.kind === "replace" ? one.contentTo : ""
}

test("an entry arriving at a file of entries without an id is given one", () => {
  const said = runChange(entriedWorld({}), { at: ENTRIES, body: ENTRY_LINE })

  expect(said.refused).toBeNull()
  expect(contentIn(said)).toMatch(MINTED)
})

test("an entry arriving with an id keeps the id that entry states", () => {
  const said = runChange(entriedWorld({}), { at: ENTRIES, body: HELD_ENTRY })

  expect(said.refused).toBeNull()
  expect(contentIn(said)).toBe(HELD_ENTRY)
})

test("an entry added beside the entries already there is the only entry given an id", () => {
  const world = entriedWorld({ [ENTRIES]: HELD_ENTRY })

  const said = runChange(world, { at: ENTRIES, body: `${HELD_ENTRY}${ENTRY_LINE}` })

  expect(said.refused).toBeNull()
  expect(contentIn(said)).toMatch(MINTED)
  expect(contentIn(said).startsWith(HELD_ENTRY)).toBe(true)
})

test("a path under a property that is no entry shape takes no id", () => {
  const said = runChange(worldOf({}), { at: ENTRIES, body: ENTRY_LINE })

  expect(said.refused).toBeNull()
  expect(contentIn(said)).toBe(ENTRY_LINE)
})
