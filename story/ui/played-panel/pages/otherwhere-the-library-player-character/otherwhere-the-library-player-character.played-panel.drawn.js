const { PlayerCharacterPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
  ]
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
    showsStats:
      envelope.sheet?.attributes !== undefined ||
      envelope.sheet?.resources !== undefined ||
      envelope.sheet?.kind !== undefined ||
      envelope.sheet?.class !== undefined ||
      envelope.sheet?.status !== undefined,
    showsBonds: false,
  },
  turns: run.turns,
  turnsPageTypeSlug: run.turnsPageTypeSlug,
}))
