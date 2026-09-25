import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

import { registerHudField } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-bar/hud-addon-bar.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import type { HudCell } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-types/hud-addon-types.module.code.ts"
import {
  formatDuration,
  formatRate,
} from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"

function framerateCell(): HudCell {
  return { text: formatRate(GetFramerate(), "fps") }
}

function latencyCell(): HudCell {
  return { text: formatRate(GetLatency(), "ms") }
}

function sessionCell(): HudCell {
  const elapsed = GetTimeStamp() - getSavedVariables().session.startTime
  return { text: formatDuration(elapsed) }
}

function ensureSession(): undefined {
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
