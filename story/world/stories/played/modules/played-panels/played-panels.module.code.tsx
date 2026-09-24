"use client"

import type { PanelRun } from "akasha/story/game/game-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import type { Shown } from "akasha/story/game/game-panel/modules/panel-loading/panel-loading.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"

export function PlayedPanels({
  shown,
  envelope,
  run,
}: {
  shown: readonly Shown[]
  envelope: SessionEnvelope
  run: PanelRun
}) {
  return (
    <>
      {shown.map((one) => (
        <one.drawn key={one.slug} envelope={envelope} run={run} />
      ))}
    </>
  )
}
