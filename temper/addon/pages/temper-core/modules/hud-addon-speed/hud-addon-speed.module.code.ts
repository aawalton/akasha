import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

import { registerHudField } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-bar/hud-addon-bar.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import type { HudCell } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-types/hud-addon-types.module.code.ts"

const SAMPLE_NAMESPACE = "TemperHudSpeedSample"
const SAMPLE_INTERVAL_MS = 200
const WINDOW_MS = 1000
const SHORTEST_SPAN_MS = 500
const MILLISECONDS_PER_SECOND = 1000
const CENTIMETERS_PER_METER = 100
const FASTEST_METERS_PER_SECOND = 50
const STILL_METERS_PER_SECOND = 0.1
const TRACE_LENGTH = 300

interface SpeedSample {
  at: number
  zone: number
  x: number
  z: number
}

let samples: SpeedSample[] = []

function metersBetween(from: SpeedSample, x: number, z: number): number {
  const dx = x - from.x
  const dz = z - from.z
  return math.sqrt(dx * dx + dz * dz) / CENTIMETERS_PER_METER
}

function takeSample(this: void): undefined {
  const [zone, x, , z] = GetUnitRawWorldPosition("player")
  const at = GetGameTimeMilliseconds()
  const last = samples[samples.length - 1]
  if (last !== undefined) {
    const seconds = (at - last.at) / MILLISECONDS_PER_SECOND
    const leapt = seconds <= 0 || metersBetween(last, x, z) / seconds > FASTEST_METERS_PER_SECOND
    if (last.zone !== zone || leapt) samples = []
  }
  samples.push({ at, zone, x, z })
  let second = samples[1]
  while (second !== undefined && samples.length > 2 && at - second.at >= WINDOW_MS) {
    samples.shift()
    second = samples[1]
  }
}

function metersPerSecond(): number | undefined {
  const first = samples[0]
  const last = samples[samples.length - 1]
  if (first === undefined || last === undefined) return undefined
  const span = last.at - first.at
  if (span < SHORTEST_SPAN_MS) return undefined
  let meters = 0
  let previous = first
  for (const step of samples) {
    meters += metersBetween(previous, step.x, step.z)
    previous = step
  }
  return meters / (span / MILLISECONDS_PER_SECOND)
}

function traceReading(speed: number | undefined): undefined {
  const last = samples[samples.length - 1]
  if (last === undefined) return
  const sv = getSavedVariables()
  const trace = sv.speedTrace ?? []
  trace.push({ at: last.at, zone: last.zone, x: last.x, z: last.z, speed: speed ?? 0 })
  while (trace.length > TRACE_LENGTH) trace.shift()
  sv.speedTrace = trace
}

function speedCell(): HudCell {
  const speed = metersPerSecond()
  traceReading(speed)
  if (speed === undefined || speed < STILL_METERS_PER_SECOND) return { text: "" }
  return { text: string.format("%.1f m/s", speed) }
}

export function installSpeedField(): undefined {
  EVENT_MANAGER.RegisterForUpdate(SAMPLE_NAMESPACE, SAMPLE_INTERVAL_MS, takeSample)
  registerHudField({ id: "speed", order: 40, compute: speedCell })
}
