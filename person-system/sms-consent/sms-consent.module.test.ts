import { expect, test } from "bun:test"
import { CONSENT_TEXT, CONSENT_TEXT_VERSION } from "./sms-consent.module.code.ts"

test("the version is a date, so one wording is told from another by when it was written", () => {
  expect(CONSENT_TEXT_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}$/)
})

test("the wording says how to stop and how to ask for help", () => {
  expect(CONSENT_TEXT).toContain("Reply STOP to opt out")
  expect(CONSENT_TEXT).toContain("HELP for help")
})

test("the wording says the messages are not marketing", () => {
  expect(CONSENT_TEXT).toContain("not marketing")
})

test("the wording names who the messages come from", () => {
  expect(CONSENT_TEXT).toContain("Alan Walton")
})

test("the wording says how often the messages come", () => {
  expect(CONSENT_TEXT).toContain("Message frequency")
})
