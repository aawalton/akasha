"use client"

import { DifficultyPanel } from "akasha/story/ui/modules/difficulty-panel/difficulty-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(DifficultyPanel, ({ run }) => ({
  storyAddress: run.storyAddress,
}))
