import { expect, test } from "bun:test"
import { deviceTokenSlugFor } from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"

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
