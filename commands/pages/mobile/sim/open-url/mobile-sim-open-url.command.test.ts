import { expect, test } from "bun:test"
import {
  appiumStartedSaid,
  simBootedSaid,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileSimOpenUrl } from "akasha/commands/pages/mobile/sim/open-url/mobile-sim-open-url.command.code.ts"

const ARGV = ["--route", "/one"]

const STARTED = appiumStartedSaid("http://mac:4723")

const BOOTED = simBootedSaid("mac")

const NO_SESSION = new Error("the session would not open")

test("a run that started Appium and then threw names that start", async () => {
  const said = await mobileSimOpenUrl(ARGV, throwingAfter([STARTED], NO_SESSION))

  expect(said.report).toEqual([STARTED])
  expect(said.refusals.at(-1)).toBe(partWay([STARTED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it started anything names the fault alone", async () => {
  const said = await mobileSimOpenUrl(ARGV, throwingAfter([], NO_SESSION))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the session would not open")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("a run that started a server and booted a simulator names both", async () => {
  const wrote = [STARTED, BOOTED]
  const said = await mobileSimOpenUrl(ARGV, throwingAfter(wrote, NO_SESSION))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${STARTED}; ${BOOTED}`)
})
