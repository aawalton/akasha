import "@akasha/temper-eso-types/eso-functions-01"

import { registerHudField } from "../hud-addon-bar/hud-addon-bar.module.code.ts"
import {
  formatDuration,
  formatFramerate,
  formatLatency,
} from "../hud-addon-format/hud-addon-format.module.code.ts"
import { getSavedVariables } from "../hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import type { HudCell } from "../hud-addon-types/hud-addon-types.module.code.ts"

function framerateCell(): HudCell {
  return { text: formatFramerate(GetFramerate()) }
}

function latencyCell(): HudCell {
  return { text: formatLatency(GetLatency()) }
}

function sessionCell(): HudCell {
  const elapsed = GetTimeStamp() - getSavedVariables().session.startTime
  return { text: formatDuration(elapsed) }
}

export function ensureSession(): undefined {
  const sv = getSavedVariables()
  if (sv.session.startTime === 0) resetSession()
}

export function resetSession(): undefined {
  getSavedVariables().session = { startTime: GetTimeStamp() }
}

export function installBuiltinFields(): undefined {
  ensureSession()
  registerHudField({ id: "framerate", order: 10, compute: framerateCell })
  registerHudField({ id: "latency", order: 20, compute: latencyCell })
  registerHudField({ id: "session", order: 30, compute: sessionCell })
}
