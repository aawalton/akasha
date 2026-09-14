"use client"

import type { GameDisplayModules } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"

export function panelsAsked(modules: GameDisplayModules): boolean {
  return modules.hud !== undefined || modules.quests !== undefined || modules.sheet !== undefined
}

export function PlayedPanels({
  modules,
  envelope,
}: {
  modules: GameDisplayModules
  envelope: SessionEnvelope
}) {
  return (
    <>
      {modules.hud === undefined ? null : (
        <HudPanel hud={envelope.hud ?? null} pools={modules.hud.pools} />
      )}
      {modules.quests === undefined ? null : <QuestsPanel quests={envelope.quests ?? null} />}
      {modules.sheet === undefined ? null : <SheetPanel sheet={envelope.sheet ?? null} />}
    </>
  )
}
