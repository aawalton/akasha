import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Booting,
  Read,
} from "akasha/commands/pages/mobile/sim/boot/mobile-sim-boot.command.code.ts"
import {
  booted,
  startedSaid,
} from "akasha/commands/pages/mobile/sim/boot/mobile-sim-boot.command.code.ts"

const BASE = "http://mac:4723"

const STARTED = startedSaid(BASE)

const READ: Read = { udid: undefined }

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
