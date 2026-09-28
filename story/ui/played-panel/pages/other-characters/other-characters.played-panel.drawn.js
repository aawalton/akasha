const { OtherCharactersPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
  ]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(OtherCharactersPanel, ({ run }) => ({
  turns: run.turns,
  pageTypeSlug: run.turnsPageTypeSlug,
}))
