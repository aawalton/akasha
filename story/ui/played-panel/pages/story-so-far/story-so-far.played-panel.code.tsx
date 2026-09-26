"use client"

import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(StorySoFar, ({ envelope }) => ({
  chapters: envelope.storySoFar ?? [],
}))
