const { SheetPanel } =
  globalThis.akashaDrawing["akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(SheetPanel, ({ envelope, run }) => ({
  sheet: envelope.sheet ?? null,
  game: run.gameExternalId,
}))
