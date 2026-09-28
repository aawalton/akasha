const { CharacterCoverPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
  ]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(CharacterCoverPanel, ({ run }) => ({
  turns: run.turns,
  turnCovers: run.turnCovers,
  player: run.player,
}))
