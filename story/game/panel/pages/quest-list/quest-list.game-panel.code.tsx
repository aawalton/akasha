"use client"

import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"

export function Panel({ envelope }: PanelDrawing) {
  return <QuestsPanel quests={envelope.quests ?? null} />
}
