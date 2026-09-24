import { expect, test } from "bun:test"
import { findingsIn } from "akasha/alan/harness/inbox/readouts/inboxes-findings/inboxes-findings.readout.reading.code.ts"

test("a count stated as text is read as the number that count spells", () => {
  expect(findingsIn({ "inbox-findings": "12" })).toBe(12)
  expect(findingsIn({ "inbox-findings": 1 })).toBe(1)
})

test("a count of zero is a count", () => {
  expect(findingsIn({ "inbox-findings": "0" })).toBe(0)
  expect(findingsIn({ "inbox-findings": 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(findingsIn({})).toBeNull()
  expect(findingsIn({ "inbox-findings": "" })).toBeNull()
  expect(findingsIn({ "inbox-findings": "   " })).toBeNull()
  expect(findingsIn({ "inbox-findings": "soon" })).toBeNull()
  expect(findingsIn({ "inbox-findings": null })).toBeNull()
})

test("the task counts beside it are never read as the finding count", () => {
  expect(findingsIn({ "inbox-tasks": "24", "inbox-temper-tasks": "22" })).toBeNull()
})
