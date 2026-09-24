import { expect, test } from "bun:test"
import { readIdleBounded } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-probe/supervisor-deferred-restart-probe.module.code.ts"

const OBS = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

test("an idle observation is answered idle", async () => {
  const held = await readIdleBounded({ observe: async () => OBS, tickMs: 1_000 })
  expect(held).toEqual({ idle: true, reason: "idle", obs: OBS })
})

test("a busy observation is answered busy with its reason", async () => {
  const busy = { ...OBS, inFlight: 2 }
  const held = await readIdleBounded({ observe: async () => busy, tickMs: 1_000 })
  expect(held).toEqual({ idle: false, reason: "inFlight=2", obs: busy })
})

test("a probe that faults reads busy rather than idle", async () => {
  const held = await readIdleBounded({
    observe: async () => {
      throw new Error("unreadable")
    },
    tickMs: 1_000,
  })
  expect(held).toEqual({ idle: false, reason: "probe-error", obs: null })
})

test("a probe past its tick reads busy rather than holding the tick open", async () => {
  const held = await readIdleBounded({ observe: () => new Promise(() => {}), tickMs: 5 })
  expect(held).toEqual({ idle: false, reason: "probe-timeout", obs: null })
})
