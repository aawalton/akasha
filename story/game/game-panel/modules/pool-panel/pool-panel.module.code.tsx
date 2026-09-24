"use client"

import type { PoolPresentation } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { PanelDrawing } from "akasha/story/game/game-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import type { ReactElement } from "react"

export function poolPanelBy(
  pools: readonly PoolPresentation[]
): (drawing: PanelDrawing) => ReactElement {
  return ({ envelope, run }) => (
    <HudPanel hud={envelope.hud ?? null} pools={pools} game={run.gameExternalId} />
  )
}
