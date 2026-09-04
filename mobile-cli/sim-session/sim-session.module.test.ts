import { describe, expect, test } from "bun:test"
import {
  buildSimCapabilities,
  DEFAULT_WDA_LOCAL_PORT,
  formatSessionState,
  parseSessionState,
  resolveWdaLocalPort,
  type SimSessionState,
  WEBVIEW_BUNDLE_ID,
} from "./sim-session.module.code.ts"

const STATE: SimSessionState = {
  sessionId: "sess-1",
  udid: "7E6CC581-6299-49D1-AFF5-C788ABF22F9F",
  appiumBase: "http://100.64.0.2:4723",
  webviewContext: "WEBVIEW_1",
  route: "capacitor://localhost/x?kbDebug=1",
  startedAtMs: 1_700_000_000_000,
}

describe("formatSessionState / parseSessionState", () => {
  test("round-trips a state", () => {
    expect(parseSessionState(formatSessionState(STATE))).toEqual(STATE)
  })

  test("round-trips with a null webviewContext and route", () => {
    const s = { ...STATE, webviewContext: null, route: null }
    expect(parseSessionState(formatSessionState(s))).toEqual(s)
  })

  test("rejects empty / garbage / partial JSON as null", () => {
    expect(parseSessionState("")).toBeNull()
    expect(parseSessionState("{")).toBeNull()
    expect(parseSessionState('{"sessionId":"x"}')).toBeNull()
  })

  test("rejects unknown keys (.strict) as null", () => {
    expect(parseSessionState(JSON.stringify({ ...STATE, extra: 1 }))).toBeNull()
  })
})

describe("buildSimCapabilities", () => {
  test("carries the load-bearing caps plus target config + wdaLocalPort", () => {
    const caps = buildSimCapabilities("UDID-1", 8205, "com.alanwalton.app")
    expect(caps).toMatchObject({
      platformName: "iOS",
      "appium:automationName": "XCUITest",
      "appium:udid": "UDID-1",
      "appium:wdaLocalPort": 8205,
      "appium:bundleId": "com.alanwalton.app",
      "appium:isHeadless": true,
      "appium:additionalWebviewBundleIds": [WEBVIEW_BUNDLE_ID],
      "appium:nativeWebTap": true,
      "appium:noReset": true,
      "appium:skipLogCapture": true,
    })
  })
})

describe("resolveWdaLocalPort", () => {
  test("defaults to a high non-8100 port when unset/blank", () => {
    expect(resolveWdaLocalPort(undefined)).toBe(DEFAULT_WDA_LOCAL_PORT)
    expect(resolveWdaLocalPort("")).toBe(DEFAULT_WDA_LOCAL_PORT)
    expect(resolveWdaLocalPort("   ")).toBe(DEFAULT_WDA_LOCAL_PORT)
    expect(DEFAULT_WDA_LOCAL_PORT).not.toBe(8100)
  })

  test("honors a valid override", () => {
    expect(resolveWdaLocalPort("8210")).toBe(8210)
    expect(resolveWdaLocalPort(" 8215 ")).toBe(8215)
  })

  test("loud-fails an out-of-range / non-numeric override (no silent fallback)", () => {
    expect(() => resolveWdaLocalPort("0")).toThrow(/valid TCP port/)
    expect(() => resolveWdaLocalPort("70000")).toThrow(/valid TCP port/)
    expect(() => resolveWdaLocalPort("nope")).toThrow(/valid TCP port/)
  })
})
