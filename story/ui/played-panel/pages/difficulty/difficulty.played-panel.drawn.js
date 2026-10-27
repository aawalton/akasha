const { DifficultyPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/difficulty-panel/difficulty-panel.module.code.tsx"
  ]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(DifficultyPanel, ({ run }) => ({
  storyAddress: run.storyAddress,
}))
