const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]
const { StorySoFar } =
  globalThis.akashaDrawing["akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"]

export const Panel = panelBy(StorySoFar, ({ envelope }) => ({
  chapters: envelope.storySoFar ?? [],
}))
