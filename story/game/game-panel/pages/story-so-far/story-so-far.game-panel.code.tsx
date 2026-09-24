"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"

export const Panel = panelBy(StorySoFar, ({ envelope }) => ({
  chapters: envelope.storySoFar ?? [],
}))
