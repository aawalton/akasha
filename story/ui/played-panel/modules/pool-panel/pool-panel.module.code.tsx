"use client"

import type { PoolPresentation } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import type { PanelDrawing } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import type { ReactElement } from "react"

export function metricLabel(metric: { readonly slug: string }): string {
  return metric.slug.split("-").slice(1).join(" ").toUpperCase()
}

export function poolPanelBy(
  pools: readonly PoolPresentation[],
  points?: string
): (drawing: PanelDrawing) => ReactElement {
  return ({ envelope }) => <HudPanel hud={envelope.hud ?? null} pools={pools} points={points} />
}
