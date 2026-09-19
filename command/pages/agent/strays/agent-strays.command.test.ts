import { expect, test } from "bun:test"
import type { TimesOf } from "akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  agentStrays,
  reportOf,
} from "akasha/command/pages/agent/strays/agent-strays.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha agent strays",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ACTING = "01a09581-cb35-7000-b00f-7156d6b3ce13--a05867e64f733ddec"

const times: TimesOf = () => ({ ranMs: 4_200_000, burnedMs: 4_140_000 })

const nowhere: TimesOf = () => null

test("a line names the process, its subagent, its times and its command line", () => {
  const said = reportOf(
    { strays: [{ pid: 2749479, actingAgentId: ACTING, cmdline: "sleep 90" }], unread: [] },
    times
  )

  expect(said[0]).toBe(`2749479  ${ACTING}  ran 1:10:00  burned 1:09:00  sleep 90`)
})

test("a process whose times will not be read is named with its times left unsaid", () => {
  const said = reportOf(
    { strays: [{ pid: 7, actingAgentId: ACTING, cmdline: "sleep 1" }], unread: [] },
    nowhere
  )

  expect(said[0]).toContain(`ran ${"?"}  burned ${"?"}`)
})

test("a reading naming no stray says that nothing is stray", () => {
  expect(reportOf({ strays: [], unread: [] }, times)[0]).toBe("nothing is stray")
})

test("a closing line names every subagent the reading could not tell about", () => {
  const said = reportOf({ strays: [], unread: [ACTING] }, times)

  expect(said[said.length - 1]).toBe(`1 subagent(s) could not be read: ${ACTING}`)
})

test("a closing line says so where every subagent was read", () => {
  const said = reportOf({ strays: [], unread: [] }, times)

  expect(said[said.length - 1]).toBe("every subagent a live process names was read")
})

test("a word is refused, because this takes none", async () => {
  const said = await agentStrays(["nonsense"], GIVEN, async () => ({ strays: [], unread: [] }))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nonsense")
})
