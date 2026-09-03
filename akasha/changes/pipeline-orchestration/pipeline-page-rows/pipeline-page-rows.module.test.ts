import { expect, test } from "bun:test"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { seqIn, textIn } from "./pipeline-page-rows.module.code.ts"

function rowOf(values: Record<string, unknown>): Row {
  return { values } as unknown as Row
}

test("a run of digits standing for a whole number above nothing is a sequence number", () => {
  expect(seqIn(rowOf({ seq: "1" }), "seq")).toBe(1)
  expect(seqIn(rowOf({ seq: "4207" }), "seq")).toBe(4207)
})

test("a sequence number of nothing, or below it, is read as absent", () => {
  expect(seqIn(rowOf({ seq: "0" }), "seq")).toBeNull()
  expect(seqIn(rowOf({ seq: "-3" }), "seq")).toBeNull()
})

test("a value that is no run of digits is no sequence number", () => {
  expect(seqIn(rowOf({ seq: "12a" }), "seq")).toBeNull()
  expect(seqIn(rowOf({ seq: "" }), "seq")).toBeNull()
  expect(seqIn(rowOf({ seq: 12 }), "seq")).toBeNull()
  expect(seqIn(rowOf({}), "seq")).toBeNull()
})

test("a text is read as it stands", () => {
  expect(textIn(rowOf({ branch: "main" }), "branch")).toBe("main")
})

test("a text of nothing but spaces, or no text at all, is read as absent", () => {
  expect(textIn(rowOf({ branch: "   " }), "branch")).toBeNull()
  expect(textIn(rowOf({ branch: "" }), "branch")).toBeNull()
  expect(textIn(rowOf({ branch: 7 }), "branch")).toBeNull()
  expect(textIn(rowOf({}), "branch")).toBeNull()
})
