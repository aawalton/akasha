"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { HAREM_HOTEL_WORKINGS } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/modules/harem-hotel-derived-beside/harem-hotel-derived-beside.module.code.ts"

export const Panel = panelBy(SheetPanel, ({ envelope, run }) => ({
  sheet: envelope.sheet ?? null,
  game: run.gameExternalId,
  workings: HAREM_HOTEL_WORKINGS,
}))
