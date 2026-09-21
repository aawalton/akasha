"use client"

import type { Shown } from "akasha/story/game/panel/modules/panel-loading/panel-loading.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"

export function PlayedPanels({
  shown,
  envelope,
}: {
  shown: readonly Shown[]
  envelope: SessionEnvelope
}) {
  return (
    <>
      {shown.map((one) => (
        <one.drawn key={one.slug} envelope={envelope} />
      ))}
    </>
  )
}
