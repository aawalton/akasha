const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]
const { SheetPanel } =
  globalThis.akashaDrawing["akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"]
const { HAREM_HOTEL_WORKINGS } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/modules/harem-hotel-derived-beside/harem-hotel-derived-beside.module.code.ts"
  ]

export const Panel = panelBy(SheetPanel, ({ envelope, run }) => ({
  sheet: envelope.sheet ?? null,
  game: run.gameExternalId,
  workings: HAREM_HOTEL_WORKINGS,
}))
