import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Probing,
  Read,
} from "akasha/commands/pages/mobile/sim/push-tap/mobile-sim-push-tap.command.code.ts"
import {
  mobileSimPushTap,
  probed,
  pushSaid,
} from "akasha/commands/pages/mobile/sim/push-tap/mobile-sim-push-tap.command.code.ts"

const UDID = "3F0C9A11-0000-4000-8000-000000000001"

const APP = { bundleId: "com.example.app" } as MobileApp

const READ: Read = { app: APP, route: "/inbox", cold: true, udid: UDID, title: undefined }

const PUSHED = pushSaid(READ, UDID)

const SAID = "PUSH_TAP_OK"

const TRACE = JSON.stringify([{ traceId: "t-1", launch: "cold", outcome: "navigated" }], null, 1)

function probing(over: Partial<Probing> = {}): Probing {
  return {
    appium: () => Promise.resolve("http://mac:4723"),
    loaded: () => null,
    sim: () => Promise.resolve(UDID),
    pushed: () => Promise.resolve(`${SAID}\n`),
    opened: () => Promise.resolve("session-1"),
    tapped: () => Promise.resolve(undefined),
    traced: () =>
      Promise.resolve({
        entries: [{ traceId: "t-1", launch: "cold", outcome: "navigated" }],
      }),
    ended: () => Promise.resolve(undefined),
    ...over,
  }
}

const SESSIONLESS = probing({
  opened: () => Promise.reject(new OperationalError("Appium would not open a session")),
})

const UNPUSHABLE = probing({
  pushed: () => Promise.reject(new OperationalError("the mac dropped the connection")),
})

const QUIET = probing({ traced: () => Promise.resolve({ quiet: true }) })

test("each thing this did is named as soon as this did it", async () => {
  const done: string[] = []

  await probed(READ, done, probing())
  expect(done).toEqual([PUSHED, SAID, TRACE])
})

test("a push-tap that threw after the push names that push in its refusal", async () => {
  const held = await answering(async (done) => await probed(READ, done, SESSIONLESS))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([PUSHED, SAID])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(PUSHED)
  expect(last).toContain(SAID)
})

test("a push-tap that threw before the push names nothing", async () => {
  const held = await answering(async (done) => await probed(READ, done, UNPUSHABLE))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a tap that drew no trace is refused with the push still named", async () => {
  const held = await answering(async (done) => await probed(READ, done, QUIET))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([PUSHED, SAID])
})

test("a call naming no route is refused before any push goes out", async () => {
  const said = await mobileSimPushTap([])

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--route")
})

test("two bare words are refused, since one push carries one route", async () => {
  const said = await mobileSimPushTap(["/inbox", "/outbox"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("/outbox")
})

test("an app slug no page carries is refused rather than defaulted", async () => {
  const said = await mobileSimPushTap(["--route", "/inbox", "--app", "nosuch"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nosuch")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimPushTap(["--bogus", "/inbox"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--warm")
})
