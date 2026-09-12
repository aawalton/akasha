import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Tearing } from "akasha/commands/pages/mobile/sim/teardown/mobile-sim-teardown.command.code.ts"
import {
  CLEARED,
  STOPPED,
  tornDown,
} from "akasha/commands/pages/mobile/sim/teardown/mobile-sim-teardown.command.code.ts"

const SESSION = "3f0c9a11"

const ENDED = `ended session ${SESSION}`

const STATE = { appiumBase: "http://mac:4723", sessionId: SESSION } as SimSessionState

const STOPPING = { stopAppium: true }

function tearing(over: Partial<Tearing> = {}): Tearing {
  return {
    loaded: () => STATE,
    ended: () => Promise.resolve(undefined),
    cleared: () => undefined,
    stopped: () => Promise.resolve(undefined),
    ...over,
  }
}

const DROPPED = tearing({
  stopped: () => Promise.reject(new OperationalError("the mac dropped the connection")),
})

const UNREADABLE = tearing({
  loaded: () => {
    throw new OperationalError("the session record would not read")
  },
})

test("each thing torn down is named as soon as that thing is torn down", async () => {
  const done: string[] = []

  await tornDown(STOPPING, done, tearing())
  expect(done).toEqual([ENDED, CLEARED, STOPPED])
})

test("a teardown that threw part way names in its refusal what it had torn down", async () => {
  const held = await answering(async (done) => await tornDown(STOPPING, done, DROPPED))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([ENDED, CLEARED])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(ENDED)
  expect(last).toContain(CLEARED)
  expect(last).not.toContain(STOPPED)
})

test("a teardown that threw before anything was torn down names nothing", async () => {
  const held = await answering(async (done) => await tornDown(STOPPING, done, UNREADABLE))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
