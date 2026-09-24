"use client"

import type { PanelDrawing } from "akasha/story/game/game-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import type { ComponentType, ReactElement } from "react"

export function panelBy<Held extends object>(
  Shown: ComponentType<Held>,
  held: (drawing: PanelDrawing) => Held
): (drawing: PanelDrawing) => ReactElement {
  return (drawing) => <Shown {...held(drawing)} />
}
