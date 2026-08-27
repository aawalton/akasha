import { describe, expect, test } from "bun:test"
import {
  buildApnsPayload,
  buildPushTapScript,
  DEEP_LINK_PATH_KEY,
  encodeApnsPayload,
} from "./push-tap-script"

const udid = "7E6CC581-6299-49D1-AFF5-C788ABF22F9F"
const bundleId = "com.alanwalton.app"
const PAYLOAD = buildApnsPayload({ bundleId, route: "/x" })

describe("the payload is the shape the shell actually reads", () => {
  test("it carries the deep-link path key, without which the tap navigates nowhere", () => {
    const payload = buildApnsPayload({ bundleId, route: "/question/q-abcd1234" })

    expect(payload[DEEP_LINK_PATH_KEY]).toBe("/question/q-abcd1234")
  })

  test("it names the target bundle — simctl silently delivers to nothing without it", () => {
    expect(buildApnsPayload({ bundleId, route: "/x" })["Simulator Target Bundle"]).toBe(bundleId)
  })

  test("it carries an alert, so a banner exists to tap at all", () => {
    const payload = buildApnsPayload({ bundleId, route: "/x", title: "T", body: "B" })

    expect(payload.aps.alert).toEqual({ title: "T", body: "B" })
  })
})

describe("a hostile route cannot reach the remote shell", () => {
  test("the payload is delivered base64-encoded, so no metacharacter survives", () => {
    const script = buildPushTapScript({
      udid,
      bundleId,
      payload: buildApnsPayload({ bundleId, route: "/x'; rm -rf ~; echo '" }),
      cold: true,
    })

    expect(script).not.toContain("rm -rf")
    expect(script).toContain("base64 -d")
  })

  test("the script carries exactly the encoded bytes of the requested payload", () => {
    const payload = buildApnsPayload({ bundleId, route: "/q/a-1" })
    const script = buildPushTapScript({ udid, bundleId, payload, cold: true })

    expect(script).toContain(encodeApnsPayload(payload))
  })
})

describe("cold and warm differ by exactly one act, and it is the one that matters", () => {
  test("a cold run terminates the app first", () => {
    const script = buildPushTapScript({ udid, bundleId, payload: PAYLOAD, cold: true })

    expect(script).toContain(`simctl terminate ${udid} ${bundleId}`)
  })

  test("a warm run does NOT terminate — terminating would make every reading cold", () => {
    const script = buildPushTapScript({ udid, bundleId, payload: PAYLOAD, cold: false })

    expect(script).not.toContain("simctl terminate")
  })

  test("both push", () => {
    for (const cold of [true, false]) {
      expect(buildPushTapScript({ udid, bundleId, payload: PAYLOAD, cold })).toContain(
        `simctl push ${udid} ${bundleId}`
      )
    }
  })
})
