import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import type { HudLayoutTrace } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-types/hud-addon-types.module.code.ts"

const NAMESPACE = "TemperHudLayoutTrace"
const KEPT = 20

let trace: HudLayoutTrace | undefined

function keep(lines: string[], line: string): undefined {
  lines.push(line)
  if (lines.length > KEPT) lines.splice(0, lines.length - KEPT)
}

function clicked(this: void): undefined {
  if (trace === undefined) return
  const over = WINDOW_MANAGER.GetMouseOverControl()
  const [x, y] = GetUIMousePosition()
  const name = over === undefined ? "nothing" : over.GetName()
  keep(trace.clicks, `${GetGameTimeMilliseconds()} ${name} at ${math.floor(x)},${math.floor(y)}`)
}

export function notePlacing(): undefined {
  if (trace !== undefined) trace.placings += 1
}

export function noteRefit(key: string, room: number): undefined {
  if (trace !== undefined) keep(trace.refits, `${GetGameTimeMilliseconds()} ${key} ${room}`)
}

export function startHudLayoutTrace(): undefined {
  trace = { placings: 0, refits: [], clicks: [] }
  getSavedVariables().hudLayoutTrace = trace
  EVENT_MANAGER.RegisterForEvent(NAMESPACE, EVENT_GLOBAL_MOUSE_UP, clicked)
}
