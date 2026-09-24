import { expect, test } from "bun:test"
import {
  type IterationWiring,
  settleIterationExit,
} from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-interactive-wire/supervisor-interactive-wire.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-types/supervisor-types.module.code.ts"

function exitedCleanly(): InheritedProc {
  return {
    exited: Promise.resolve(0),
    exitStatus: () => ({ exitCode: 0, signal: null }),
    pid: 0,
    kill: () => undefined,
  }
}

function wiringOver(
  cancel: (() => void) | null,
  preCliffMonitor: { stop: () => void } | null = null
): IterationWiring {
  return {
    actionSubsystem: { wasSupervisorKill: () => false } as never,
    pendingEvent: { value: null },
    deferredRestart: { cancel },
    preCliffMonitor,
  }
}

test("settling cancels the deferred restart and leaves nothing armed", async () => {
  let cancelled = 0
  const wiring = wiringOver(() => {
    cancelled += 1
  })

  await settleIterationExit(wiring, exitedCleanly())

  expect(cancelled).toBe(1)
  expect(wiring.deferredRestart.cancel).toBeNull()
})

test("settling with no deferred restart armed cancels nothing", async () => {
  const wiring = wiringOver(null)

  await settleIterationExit(wiring, exitedCleanly())

  expect(wiring.deferredRestart.cancel).toBeNull()
})

test("settling stops the pre-cliff monitor that iteration started", async () => {
  let stopped = 0
  await settleIterationExit(
    wiringOver(null, {
      stop: () => {
        stopped += 1
      },
    }),
    exitedCleanly()
  )

  expect(stopped).toBe(1)
})
