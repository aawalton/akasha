import { expect, test } from "bun:test"
import { wordingIn } from "akasha/person/modules/sms-consent/sms-consent.module.code.ts"
import { amyTextMessages } from "akasha/person/sms-consent/wording/pages/amy-text-messages.sms-consent-wording.ts"

const WORDING = amyTextMessages.description

test("the wording page is read as its description and the version it states", () => {
  expect(wordingIn(amyTextMessages)).toEqual({
    wording: WORDING,
    version: amyTextMessages.consentTextVersion,
  })
})

test("a page stating no version is no wording", () => {
  expect(wordingIn({ description: WORDING })).toBeNull()
})

test("the version is a date, so one wording is told from another by when it was written", () => {
  expect(amyTextMessages.consentTextVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/)
})

test("the wording says how to stop and how to ask for help", () => {
  expect(WORDING).toContain("Reply STOP to opt out")
  expect(WORDING).toContain("HELP for help")
})

test("the wording says the messages are not marketing", () => {
  expect(WORDING).toContain("not marketing")
})
