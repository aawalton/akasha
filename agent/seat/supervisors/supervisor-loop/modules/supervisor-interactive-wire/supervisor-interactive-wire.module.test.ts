import { expect, test } from "bun:test"
import {
  type IterationWiring,
  settleIterationExit,
} from "akasha/agent/seat/supervisors/supervisor-loop/modules/supervisor-interactive-wire/supervisor-interactive-wire.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisors/supervisor-process/modules/supervisor-types/supervisor-types.module.code.ts"
import { watchSeatRotation } from "akasha/agent/seat/supervisors/supervisor-ticking/modules/supervisor-rotation-watch/supervisor-rotation-watch.module.code.ts"

function waited(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function nothing(): Promise<void> {
  return Promise.resolve()
}

function exitedCleanly(): InheritedProc {
  return {
    exited: Promise.resolve(0),
    exitStatus: () => ({ exitCode: 0, signal: null }),
    pid: 0,
    kill: () => undefined,
  }
}

function wiringOver(stopSessionRotatedWatch: () => void): IterationWiring {
  return {
    actionSubsystem: { wasSupervisorKill: () => false } as never,
    pendingEvent: { value: null },
    deferredRestart: { cancel: null },
    preCliffMonitor: null,
    stopSessionRotatedWatch,
  }
}

test("settling stops the rotation watch that iteration wired", async () => {
  let stopped = 0
  await settleIterationExit(
    wiringOver(() => {
      stopped += 1
    }),
    exitedCleanly()
  )

  expect(stopped).toBe(1)
})

test("a second wiring does not leave the first watcher polling", async () => {
  let firstAsked = 0
  let secondAsked = 0
  const stopFirst = watchSeatRotation(
    () => {
      firstAsked += 1
      return null
    },
    nothing,
    { pollMs: 1 }
  )

  await settleIterationExit(wiringOver(stopFirst), exitedCleanly())
  const stopSecond = watchSeatRotation(
    () => {
      secondAsked += 1
      return null
    },
    nothing,
    { pollMs: 1 }
  )

  await waited(20)
  const firstAfter = firstAsked
  await waited(20)
  stopSecond()

  expect(firstAsked).toBe(firstAfter)
  expect(secondAsked).toBeGreaterThan(3)
})
