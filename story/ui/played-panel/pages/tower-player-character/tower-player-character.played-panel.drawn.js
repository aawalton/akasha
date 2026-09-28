const { PlayerCharacterPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
  ]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]
const { TOWER_WORKINGS } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"
  ]

export const Panel = panelBy(PlayerCharacterPanel, ({ envelope, run }) => ({
  player: run.player,
  showsCover: false,
  sheet: { sheet: envelope.sheet ?? null, game: run.gameExternalId, workings: TOWER_WORKINGS },
}))
