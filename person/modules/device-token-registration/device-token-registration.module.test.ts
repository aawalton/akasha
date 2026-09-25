import { expect, test } from "bun:test"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  deviceTokenSlugFor,
  registerDeviceToken,
} from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"
import { z } from "zod"

const READ_AT = "c".repeat(40)

const SENT_BODY = z.record(z.string(), z.unknown())

type Sent = { readonly at: string; readonly body: Record<string, unknown> }

function pagesAnswering(sent: Sent[]): Fetcher {
  return async (url, init) => {
    const at = new URL(url).pathname
    const body = SENT_BODY.parse(JSON.parse(String(init.body)))
    sent.push({ at, body })
    const answer = (said: unknown) => new Response(JSON.stringify(said), { status: 200 })
    if (at === "/ask" && body.pageTypeSlug === "person") return answer({ rows: [{ slug: "alan" }] })
    if (at === "/ask") return answer({ rows: [{ slug: "alanwalton", bundleId: "com.alan" }] })
    if (at === "/read") return answer({ at: READ_AT, bodies: [], unplaced: ["device-token/x"] })
    return answer({ commit: null, wrote: [], took: [] })
  }
}

test("a registration states the commit the token's page was read at", async () => {
  const sent: Sent[] = []
  const registration = {
    contributor: "a-contributor",
    deviceTokenRegistration: "AB12",
    platform: "ios",
    bundleId: "com.alan",
  }
  await registerDeviceToken(registration, pagesAnswering(sent), async () => undefined)
  const slug = deviceTokenSlugFor("alan", "alanwalton", "AB12")
  const read = sent.find((one) => one.at === "/read")
  expect(read?.body.pages).toEqual([{ pageTypeSlug: "device-token", slug }])
  expect(sent.find((one) => one.at === "/write")?.body.read).toBe(READ_AT)
  expect(sent.findIndex((one) => one.at === "/read")).toBeLessThan(
    sent.findIndex((one) => one.at === "/write")
  )
})

const ALERT_TOKEN = "F3856B70C2A1C4435D399176B9C28C8435285A777A482F8F9A93E89A60DEF19B"

const LIVE_ACTIVITY_TOKEN = `${ALERT_TOKEN}${ALERT_TOKEN}${ALERT_TOKEN.slice(0, 32)}`

test("a token addressing a live activity is named by a slug as short as an alert token's", () => {
  const alert = deviceTokenSlugFor("alan", "alanwalton", ALERT_TOKEN)
  const activity = deviceTokenSlugFor("alan", "alanwalton", LIVE_ACTIVITY_TOKEN)

  expect(LIVE_ACTIVITY_TOKEN.length).toBeGreaterThan(ALERT_TOKEN.length)
  expect(activity.length).toBe(alert.length)
  expect(activity.length).toBeLessThan(LIVE_ACTIVITY_TOKEN.length)
})

test("one token in either case is named by one slug", () => {
  expect(deviceTokenSlugFor("alan", "alanwalton", ALERT_TOKEN)).toBe(
    deviceTokenSlugFor("alan", "alanwalton", ALERT_TOKEN.toLowerCase())
  )
})

test("two tokens are named by two slugs", () => {
  expect(deviceTokenSlugFor("alan", "alanwalton", ALERT_TOKEN)).not.toBe(
    deviceTokenSlugFor("alan", "alanwalton", LIVE_ACTIVITY_TOKEN)
  )
})
