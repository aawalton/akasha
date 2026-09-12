import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  appiumStartedSaid,
  simBootedSaid,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Booting,
  Read,
} from "akasha/commands/pages/mobile/sim/boot/mobile-sim-boot.command.code.ts"
import {
  booted,
  mobileSimBoot,
} from "akasha/commands/pages/mobile/sim/boot/mobile-sim-boot.command.code.ts"

const BASE = "http://mac:4723"

const STARTED = appiumStartedSaid(BASE)

const READ: Read = { udid: undefined }

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha mobile sim boot",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function booting(over: Partial<Booting> = {}): Booting {
  return {
    up: () => Promise.resolve(false),
    appium: () => Promise.resolve(BASE),
    sim: () => Promise.resolve("3F0C9A11-0000-4000-8000-000000000001"),
    ...over,
  }
}

const SIMLESS = booting({
  sim: () => Promise.reject(new OperationalError("no simulator udid resolved")),
})

const UNREACHABLE = booting({
  up: () => Promise.reject(new OperationalError("the mac dropped the connection")),
})

const ALREADY_UP = booting({
  up: () => Promise.resolve(true),
  sim: () => Promise.reject(new OperationalError("no simulator udid resolved")),
})

test("the Appium server this started is named as soon as that server is up", async () => {
  const done: string[] = []

  await booted(READ, done, booting())
  expect(done).toEqual([STARTED])
})

test("a boot that threw after starting Appium names that start in its refusal", async () => {
  const held = await answering(async (done) => await booted(READ, done, SIMLESS))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([STARTED])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(STARTED)
})

const BOOTED = simBootedSaid("mac")

const SIM_UNREADABLE = booting({
  sim: (done) => {
    done.push(BOOTED)
    return Promise.reject(new OperationalError("could not resolve a simulator udid"))
  },
})

test("a simulator booted before the udid would not be read is named in the refusal", async () => {
  const held = await answering(async (done) => await booted(READ, done, SIM_UNREADABLE))

  expect(held.report).toEqual([STARTED, BOOTED])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(`${STARTED}; ${BOOTED}`)
})

test("a boot that threw before Appium was started names nothing", async () => {
  const held = await answering(async (done) => await booted(READ, done, UNREACHABLE))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("an Appium server already up is started by nothing, so a later throw names nothing", async () => {
  const held = await answering(async (done) => await booted(READ, done, ALREADY_UP))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a flag this takes no argument at is refused before Appium is reached", async () => {
  const said = await mobileSimBoot(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--udid")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimBoot(["3F0C9A11"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("3F0C9A11")
})

test("a flag naming a value with nothing after it is refused", async () => {
  const said = await mobileSimBoot(["--udid"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--udid")
})
