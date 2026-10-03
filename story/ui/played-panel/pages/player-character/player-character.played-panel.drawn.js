const { PlayerCharacterPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
  ]
const { statsShownIn } =
  globalThis.akashaDrawing["akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(PlayerCharacterPanel, ({ envelope, run }) => ({
  player: run.player,
  showsCover: true,
  sheet: {
    sheet: envelope.sheet ?? null,
    game: run.gameExternalId,
    showsStats: statsShownIn(envelope.sheet),
    showsBonds: true,
  },
  turns: run.turns,
  turnsPageTypeSlug: run.turnsPageTypeSlug,
}))
