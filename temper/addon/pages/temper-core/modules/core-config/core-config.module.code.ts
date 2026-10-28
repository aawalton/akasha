import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import type { HudDock } from "akasha/temper/addon/pages/temper-core/modules/hud-layout-place/hud-layout-place.module.code.ts"
import "akasha/temper/addon/pages/temper-core/core-config-declarations/core-config-declarations.type-declaration.d.ts"

export interface HudLayoutDock {
  readonly gap: number
}

export type InputMode = "keyboard" | "gamepad"

export interface HudLayoutPanel {
  readonly key: string
  readonly dock: HudDock
  readonly displayOrder: number
  readonly inputModes: readonly InputMode[]
  readonly neverMoves: boolean
  readonly measuredBy?: string
}

export interface HudLayout {
  readonly docks: Readonly<Partial<Record<HudDock, HudLayoutDock>>>
  readonly panels: readonly HudLayoutPanel[]
}

interface CoreConfig {
  readonly version: number
  readonly hudLayout?: HudLayout
}

function isCoreConfig(value: unknown): value is CoreConfig {
  if (!isObjectRecord(value)) return false
  const version = value["version"]
  return typeof version === "number" && version > 0
}

function statesInputModes(panel: HudLayoutPanel): boolean {
  const modes: unknown = panel.inputModes
  return typeof modes === "object" && modes !== null
}

export function hudLayoutIn(config: unknown): HudLayout | undefined {
  if (!isCoreConfig(config) || config.hudLayout === undefined) return undefined
  const layout = config.hudLayout
  return { docks: layout.docks, panels: layout.panels.filter(statesInputModes) }
}

export function hudLayout(): HudLayout | undefined {
  return hudLayoutIn(globalThis.TemperConfig)
}
