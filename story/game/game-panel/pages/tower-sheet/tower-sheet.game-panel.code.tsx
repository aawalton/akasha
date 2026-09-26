"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { TOWER_WORKINGS } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"

export const Panel = panelBy(SheetPanel, ({ envelope, run }) => ({
  sheet: envelope.sheet ?? null,
  game: run.gameExternalId,
  workings: TOWER_WORKINGS,
}))
