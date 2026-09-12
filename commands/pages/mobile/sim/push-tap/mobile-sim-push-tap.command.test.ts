import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { PUSH_TAP_APNS_AT } from "akasha/alan/harness/mobile-cli/push-tap-script/push-tap-script.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Probing,
  Read,
} from "akasha/commands/pages/mobile/sim/push-tap/mobile-sim-push-tap.command.code.ts"
import {
  mobileSimPushTap,
  probed,
  pushSaid,
  puttingSaid,
} from "akasha/commands/pages/mobile/sim/push-tap/mobile-sim-push-tap.command.code.ts"

const UDID = "3F0C9A11-0000-4000-8000-000000000001"

const CALLED_AS = "akasha mobile sim push-tap"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const APP = { bundleId: "com.example.app" } as MobileApp

const READ: Read = { app: APP, route: "/inbox", cold: true, udid: UDID, title: undefined }

const PUSHED = pushSaid(READ, UDID)

const PUTTING = puttingSaid(READ, UDID)

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
  expect(done).toEqual([PUTTING, PUSHED, SAID, TRACE])
})

test("a push-tap that threw after the push names that push in its refusal", async () => {
  const held = await answering(async (done) => await probed(READ, done, SESSIONLESS))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([PUTTING, PUSHED, SAID])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(PUSHED)
  expect(last).toContain(SAID)
})

test("a push-tap that threw inside the push names what that script may have got through", async () => {
  const held = await answering(async (done) => await probed(READ, done, UNPUSHABLE))

  expect(held.report).toEqual([PUTTING])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain(PUSH_TAP_APNS_AT)
  expect(last).toContain(`terminates ${APP.bundleId} on ${UDID}`)
})

test("a tap that drew no trace is refused with the push still named", async () => {
  const held = await answering(async (done) => await probed(READ, done, QUIET))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([PUTTING, PUSHED, SAID])
  expect(held.refusals.at(-1)).toContain(PUSHED)
})

test("a call naming no route is refused before any push goes out", async () => {
  const said = await mobileSimPushTap([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--route")
})

test("two bare words are refused, since one push carries one route", async () => {
  const said = await mobileSimPushTap(["/inbox", "/outbox"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    `\`${CALLED_AS}\` takes 1 word and this call says 2 words — nothing takes \`/outbox\``
  )
})

test("an app slug no page carries is refused rather than defaulted", async () => {
  const said = await mobileSimPushTap(["--route", "/inbox", "--app", "nosuch"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nosuch")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimPushTap(["--bogus", "/inbox"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--warm")
})
