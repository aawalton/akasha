const { SceneCoverPanel } =
  globalThis.akashaDrawing[
    "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
  ]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(SceneCoverPanel, ({ run }) => ({
  turns: run.turns,
  turnCovers: [],
  areScenes: true,
  gameExternalId: run.gameExternalId,
}))
