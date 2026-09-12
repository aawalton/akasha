import { describe, expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Opening } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import {
  APP_ORIGIN,
  buildAppUrl,
  openSession,
  STORED,
  sessionSaid,
  signedInSaid,
} from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"

const SESSION = "3f0c9a11"

const OPENED = sessionSaid(SESSION)

const SIGNED_IN = signedInSaid(false)

const OPTS = {
  base: "http://mac:4723",
  udid: "3F0C9A11-0000-4000-8000-000000000001",
  bundleId: "com.example.app",
  route: "/inbox",
  kbDebug: false,
  asRealUser: false,
}

function opening(over: Partial<Opening> = {}): Opening {
  return {
    loaded: () => null,
    live: () => Promise.resolve(false),
    created: () => Promise.resolve(SESSION),
    dismissed: () => Promise.resolve(undefined),
    acquired: () => Promise.resolve("WEBVIEW_1"),
    minted: () => Promise.resolve({ session: { access_token: "a" }, userId: "user-1" }),
    scripted: () => Promise.resolve(true),
    saved: () => undefined,
    ...over,
  }
}

const WEBVIEWLESS = opening({
  acquired: (_base: string, sessionId: string) =>
    sessionId === SESSION
      ? Promise.reject(new OperationalError("the WKWebView never attached"))
      : Promise.resolve("WEBVIEW_1"),
})

const SESSIONLESS = opening({
  created: () => Promise.reject(new OperationalError("Appium would not open a session")),
})

const STORELESS = opening({
  scripted: () => Promise.reject(new OperationalError("the webview would not run the script")),
})

describe("buildAppUrl", () => {
  test("prefixes the app origin and adds a leading slash when missing", () => {
    expect(buildAppUrl("notes/note", false)).toBe(`${APP_ORIGIN}/notes/note`)
    expect(buildAppUrl("/notes/note", false)).toBe(`${APP_ORIGIN}/notes/note`)
  })

  test("appends kbDebug=1 with the correct separator", () => {
    expect(buildAppUrl("/x", true)).toBe(`${APP_ORIGIN}/x?kbDebug=1`)
    expect(buildAppUrl("/x?foo=1", true)).toBe(`${APP_ORIGIN}/x?foo=1&kbDebug=1`)
  })

  test("does not double-add kbDebug when already present", () => {
    expect(buildAppUrl("/x?kbDebug=1", true)).toBe(`${APP_ORIGIN}/x?kbDebug=1`)
  })

  test("omits kbDebug when not requested", () => {
    expect(buildAppUrl("/x?foo=1", false)).toBe(`${APP_ORIGIN}/x?foo=1`)
  })
})

test("each thing an opening did is named as soon as that thing is done", async () => {
  const done: string[] = []

  await openSession(OPTS, done, opening())
  expect(done).toEqual([OPENED, SIGNED_IN, STORED])
})

test("an opening that threw part way names in its refusal what it had done", async () => {
  const held = await answering(async (done) => {
    await openSession(OPTS, done, STORELESS)
    return told([])
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([OPENED, SIGNED_IN])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(OPENED)
  expect(last).toContain(SIGNED_IN)
  expect(last).not.toContain(STORED)
})

test("a session left with no webview is named, since nothing has written it down", async () => {
  const held = await answering(async (done) => {
    await openSession(OPTS, done, WEBVIEWLESS)
    return told([])
  })

  expect(held.report).toEqual([OPENED])
  expect(held.refusals[held.refusals.length - 1]).toContain(OPENED)
})

test("an opening that threw before anything was done names nothing", async () => {
  const held = await answering(async (done) => {
    await openSession(OPTS, done, SESSIONLESS)
    return told([])
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
