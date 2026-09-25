import { expect, test } from "bun:test"
import {
  consentPageFor,
  consentWritten,
} from "akasha/alan/web/routes/alan-web-api-sms-opt-in/alan-web-api-sms-opt-in.route.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

const READ_AT = "d".repeat(40)

const SENT_BODY = z.record(z.string(), z.unknown())

type Sent = { readonly at: string; readonly body: Record<string, unknown> }

function pagesAnswering(sent: Sent[]): Fetcher {
  return async (url, init) => {
    const at = url.slice(url.lastIndexOf("/"))
    const body = SENT_BODY.parse(JSON.parse(String(init.body)))
    sent.push({ at, body })
    const said = at === "/read" ? { at: READ_AT, bodies: [], unplaced: [] } : { wrote: [] }
    return new Response(JSON.stringify(said), { status: 200 })
  }
}

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

test("a consent reads its page first and states the commit that read", async () => {
  const sent: Sent[] = []
  const page = consentPageFor(GIVEN)
  await consentWritten(page, pagesAnswering(sent), async () => undefined)
  expect(sent.map((one) => one.at)).toEqual(["/read", "/write"])
  expect(sent[0]?.body.pages).toEqual([{ pageTypeSlug: page.pageTypeSlug, slug: page.slug }])
  expect(sent[1]?.body.read).toBe(READ_AT)
})

test("a consent with no address and no agent states neither", () => {
  const page = consentPageFor({ ...GIVEN, address: null, agent: null })
  expect(page.values).not.toHaveProperty("ipAddress")
  expect(page.values).not.toHaveProperty("userAgent")
})
