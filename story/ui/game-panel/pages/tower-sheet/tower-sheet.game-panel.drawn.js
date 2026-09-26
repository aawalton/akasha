const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]
const { SheetPanel } =
  globalThis.akashaDrawing["akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"]
const { TOWER_WORKINGS } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"
  ]

export const Panel = panelBy(SheetPanel, ({ envelope, run }) => ({
  sheet: envelope.sheet ?? null,
  game: run.gameExternalId,
  workings: TOWER_WORKINGS,
}))
