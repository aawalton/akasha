"use client"

import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"

export function Panel({ envelope }: PanelDrawing) {
  return <SheetPanel sheet={envelope.sheet ?? null} />
}
