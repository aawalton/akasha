const { QuestsPanel } =
  globalThis.akashaDrawing["akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(QuestsPanel, ({ envelope }) => ({ quests: envelope.quests ?? null }))
