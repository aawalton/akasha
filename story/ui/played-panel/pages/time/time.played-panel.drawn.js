const { TimePanel } =
  globalThis.akashaDrawing["akasha/story/ui/modules/time-panel/time-panel.module.code.tsx"]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(TimePanel, ({ run }) => ({
  clock: run.clock,
  upcoming: run.upcoming,
}))
