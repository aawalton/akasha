const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]
const { PlayedChannel } =
  globalThis.akashaDrawing[
    "akasha/story/world/stories/played/modules/played-channel/played-channel.module.code.tsx"
  ]

export const Panel = panelBy(PlayedChannel, ({ run }) => run)
