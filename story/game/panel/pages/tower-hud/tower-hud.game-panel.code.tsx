"use client"

import type { PoolPresentation } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"

const POOLS: readonly PoolPresentation[] = [
  { key: "hp", max: "hpMax", color: "red", label: "VITAE" },
  { key: "focus", max: "focusMax", color: "blue", label: "FOCUS" },
  { key: "stamina", max: "stamMax", color: "green", label: "STAMINA" },
]

export function Panel({ envelope }: PanelDrawing) {
  return <HudPanel hud={envelope.hud ?? null} pools={POOLS} />
}
