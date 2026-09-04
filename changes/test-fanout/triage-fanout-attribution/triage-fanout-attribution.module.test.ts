import { expect, test } from "bun:test"
import {
  attributionFor,
  type FailSignal,
  splitProducerTag,
  UNATTRIBUTED_SECTION,
} from "./triage-fanout-attribution.module.code.ts"

const signalOf = (over: Partial<FailSignal>): FailSignal => ({
  evidence: "(fail) a test",
  signal: "test",
  producer: null,
  file: null,
  workspace: null,
  ...over,
})

test("a tagged line yields its producer and the line without the tag", () => {
  expect(splitProducerTag("[fanout-ws:akasha/day] (fail) a test")).toEqual({
    producer: "akasha/day",
    text: "(fail) a test",
  })
})

test("an untagged line keeps its whole text and names no producer", () => {
  expect(splitProducerTag("(fail) a test")).toEqual({ producer: null, text: "(fail) a test" })
})

test("a producer tag charges the line to the workspace it names", () => {
  const at = attributionFor(signalOf({ producer: "akasha/day", file: "d.test.ts" }), true)
  expect(at).toEqual({
    kind: "resolved",
    basis: "producer-tagged",
    workspace: "akasha/day",
    file: "d.test.ts",
  })
})

test("an untagged line in a shared log is declined rather than guessed at", () => {
  expect(attributionFor(signalOf({ workspace: "akasha/day" }), true)).toEqual({ kind: "declined" })
})

test("an untagged line in a single stream is charged to its section", () => {
  const at = attributionFor(signalOf({ workspace: "akasha/day", file: "d.test.ts" }), false)
  expect(at).toEqual({
    kind: "resolved",
    basis: "single-stream",
    workspace: "akasha/day",
    file: "d.test.ts",
  })
})

test("the unattributed section is named once, for a resolved line with no workspace", () => {
  expect(UNATTRIBUTED_SECTION).toBe("(unattributed)")
})
