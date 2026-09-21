"use client"

import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ComponentType, ReactElement } from "react"

export function panelBy<Held extends object>(
  Shown: ComponentType<Held>,
  held: (envelope: SessionEnvelope) => Held
): (drawing: PanelDrawing) => ReactElement {
  return ({ envelope }) => <Shown {...held(envelope)} />
}
