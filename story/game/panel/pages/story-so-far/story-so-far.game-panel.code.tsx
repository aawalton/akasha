"use client"

import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"

export function Panel({ envelope }: PanelDrawing) {
  return <StorySoFar chapters={envelope.storySoFar ?? []} />
}
