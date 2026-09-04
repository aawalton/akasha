import { expect, test } from "bun:test"
import { readIdleBounded } from "./supervisor-deferred-restart-probe.module.code.ts"

const OBS = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

const answering = (idle: boolean, reason: string) => ({
  preservingRestart: async () => ({ value: { idle, reason }, notice: null }),
  pastCliff: async () => ({ value: { idle, reason }, notice: null }),
  busyReason: async () => ({ value: reason, notice: null }),
  ignoredMcpCmdlines: async () => ({ value: [], notice: null }),
})

test("an observation the rule reads as idle is answered idle", async () => {
  const held = await readIdleBounded({
    observe: async () => OBS,
    idleRule: answering(true, "idle") as never,
    tickMs: 1_000,
  })
  expect(held).toEqual({ idle: true, reason: "idle", obs: OBS })
})

test("a probe that faults reads busy rather than idle", async () => {
  const held = await readIdleBounded({
    observe: async () => {
      throw new Error("unreadable")
    },
    idleRule: answering(true, "idle") as never,
    tickMs: 1_000,
  })
  expect(held).toEqual({ idle: false, reason: "probe-error", obs: null })
})

test("a probe past its tick reads busy rather than holding the tick open", async () => {
  const held = await readIdleBounded({
    observe: () => new Promise(() => {}),
    idleRule: answering(true, "idle") as never,
    tickMs: 5,
  })
  expect(held).toEqual({ idle: false, reason: "probe-timeout", obs: null })
})

test("a rule that faults reads busy rather than idle", async () => {
  const held = await readIdleBounded({
    observe: async () => OBS,
    idleRule: {
      preservingRestart: async () => {
        throw new Error("unreachable")
      },
    } as never,
    tickMs: 1_000,
  })
  expect(held.idle).toBe(false)
  expect(held.reason).toBe("probe-error")
})
