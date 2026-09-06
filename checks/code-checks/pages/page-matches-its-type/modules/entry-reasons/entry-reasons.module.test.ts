import { expect, test } from "bun:test"
import { fieldsOf } from "./entry-reasons.module.code.ts"
import {
  entriesJudged,
  ID_LESS,
  NO_ID,
  partsJudged,
  shapingFor,
} from "./entry-reasons.module.test-fixtures.ts"

const OWN = new Set(["id"])

test("an entry beside the page is judged against the fields its shape declares", () => {
  expect(fieldsOf({ id: "one", answer: "YES" }, shapingFor(), OWN)).toEqual([])
  expect(fieldsOf({ id: "one", nope: 1 }, shapingFor(), OWN)).toEqual([
    "states `cases nope`, which `cases` does not declare",
  ])
})

test("the cases beside the restatement test are read and judged", () => {
  expect(entriesJudged(null)).toEqual([])
  expect(entriesJudged("no json here\n")[0]).toContain("unknown rather than nothing")
  expect(entriesJudged(ID_LESS)).toEqual([NO_ID])
  expect(partsJudged("", ID_LESS)).toEqual([NO_ID])
})
