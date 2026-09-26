const { StorySoFar } =
  globalThis.akashaDrawing["akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"]
const { panelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"
  ]

export const Panel = panelBy(StorySoFar, ({ envelope }) => ({
  chapters: envelope.storySoFar ?? [],
}))
