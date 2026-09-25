import { expect, test } from "bun:test"
import { consentPageFor } from "akasha/alan/web/routes/alan-web-api-sms-opt-in/alan-web-api-sms-opt-in.route.code.ts"

const CARRIED = [
  "title",
  "phone",
  "consent",
  "consentTextVersion",
  "submittedAt",
  "ipAddress",
  "userAgent",
]

const GIVEN = {
  name: "Held Name",
  e164: "+16085550100",
  submittedAt: "2026-09-25T12:00:00.000Z",
  address: "203.0.113.9",
  agent: "held agent",
}

test("a consent hands over only values an sms-consent page carries", () => {
  const page = consentPageFor(GIVEN)
  for (const key of Object.keys(page.values)) expect(CARRIED).toContain(key)
})

test("a consent names the page type in the page rather than among its values", () => {
  const page = consentPageFor(GIVEN)
  expect(page.pageTypeSlug).toBe("sms-consent")
  expect(page.values).not.toHaveProperty("pageTypeSlug")
})

test("a consent's slug is the page type, the digits of the number and the day", () => {
  expect(consentPageFor(GIVEN).slug).toBe("sms-consent-16085550100-2026-09-25")
})

test("a consent with no address and no agent states neither", () => {
  const page = consentPageFor({ ...GIVEN, address: null, agent: null })
  expect(page.values).not.toHaveProperty("ipAddress")
  expect(page.values).not.toHaveProperty("userAgent")
})
