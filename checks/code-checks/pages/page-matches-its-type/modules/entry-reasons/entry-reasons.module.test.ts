import { expect, test } from "bun:test"
import { fieldsOf } from "akasha/checks/code-checks/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import {
  entriesJudged,
  groupFieldsFor,
  ID_LESS,
  NO_ID,
  nestedShapingFor,
  oneOfShapingFor,
  openedFor,
  partsJudged,
  shapingFor,
} from "akasha/checks/code-checks/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.test-fixtures.ts"

const OWN = new Set(["id"])

const ANSWERED = { id: "one", answer: "YES" }

test("a record nested in an entry row is judged against what declares that record", () => {
  expect(fieldsOf({ ...ANSWERED, step: { tag: "hi" } }, nestedShapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ ...ANSWERED, step: { tag: "hello" } }, nestedShapingFor(), OWN)).toEqual([
    "`step tag` runs to 5 characters, over the length of 4",
  ])
  expect(fieldsOf({ ...ANSWERED, step: { nope: 1 } }, nestedShapingFor(), OWN)).toEqual([
    "states `step nope`, which `step` does not declare",
  ])
})

test("a field whose property declares fields and holds no record is refused", () => {
  expect(fieldsOf({ ...ANSWERED, step: "block-all" }, nestedShapingFor(), OWN)).toEqual([
    '`cases step` is "block-all", and a value whose property declares fields is a record',
  ])
  expect(fieldsOf({ ...ANSWERED, step: 1 }, nestedShapingFor(), OWN)).toEqual([
    "`cases step` is 1, and a value whose property declares fields is a record",
  ])
})

test("a row leaving out a field its shape requires is refused", () => {
  expect(fieldsOf(ANSWERED, shapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ id: "one" }, shapingFor(), OWN)).toEqual([
    "does not state `cases case-answer`, which `cases` requires",
  ])
})

test("a field its shape leaves optional is not demanded of a row", () => {
  expect(fieldsOf({ ...ANSWERED, step: { tag: "hi" } }, nestedShapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ id: "one", step: { tag: "hi" } }, nestedShapingFor(), OWN)).toEqual([
    "does not state `cases case-answer`, which `cases` requires",
  ])
})

test("a one-of property opens the one member that declares fields", () => {
  expect(openedFor(["record-property/invariants", "relation-property/page-domain"])).toEqual([
    ["invariantKind", "statement"],
    true,
  ])
  expect(openedFor(["relation-property/page-domain", "relation-property/initiative"])).toEqual([
    [],
    true,
  ])
  expect(openedFor(["record-property/invariants", "record-property/directives"])).toEqual([
    [],
    true,
  ])
})

test("a value a one-of's member with no fields admits gives no reason", () => {
  expect(fieldsOf({ ...ANSWERED, step: "block-all" }, oneOfShapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ ...ANSWERED, step: { tag: "hello" } }, oneOfShapingFor(), OWN)).toEqual([
    "`step tag` runs to 5 characters, over the length of 4",
  ])
})

test("an entry beside the page is judged against the fields its shape declares", () => {
  expect(fieldsOf(ANSWERED, shapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ ...ANSWERED, nope: 1 }, shapingFor(), OWN)).toEqual([
    "states `cases nope`, which `cases` does not declare",
  ])
})

test("a group's fields are the members its page type declares, less those held in files", () => {
  expect(groupFieldsFor({ maxCpuSeconds: 10 })).toEqual([
    "maxCpuSeconds",
    "maxMemoryMb",
    "maxWallSeconds",
  ])
  expect(groupFieldsFor("ts")).toEqual([])
  expect(groupFieldsFor([{ maxCpuSeconds: 10 }])).toEqual([])
})

test("the cases beside the restatement test are read and judged", () => {
  expect(entriesJudged(null)).toEqual([])
  expect(entriesJudged("no json here\n")[0]).toContain("unknown rather than nothing")
  expect(entriesJudged(ID_LESS)).toEqual([NO_ID])
  expect(partsJudged("", ID_LESS)).toEqual([NO_ID])
})
