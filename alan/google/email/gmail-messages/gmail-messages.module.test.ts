import { expect, test } from "bun:test"
import {
  buildLabelModification,
  labelledSaid,
  sentSaid,
  trashedSaid,
} from "akasha/alan/google/email/gmail-messages/gmail-messages.module.code.ts"

test("a relabelling that adds and removes nothing is refused", () => {
  expect(() => buildLabelModification({})).toThrow("at least one")
})

test("a message gmail sent names everyone it went to", () => {
  const said = sentSaid(["one@example.com", "two@example.com"])

  expect(said).toContain("one@example.com, two@example.com")
  expect(said).toContain("cannot be undone")
})

test("a relabelling gmail took names the message", () => {
  expect(labelledSaid("abc123")).toContain("abc123")
})

test("a message gmail trashed names the message", () => {
  expect(trashedSaid("abc123")).toContain("abc123")
})
