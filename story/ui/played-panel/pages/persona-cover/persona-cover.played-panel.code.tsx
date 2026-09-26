"use client"

import { PersonaCoverPanel } from "akasha/story/ui/modules/persona-cover-panel/persona-cover-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(PersonaCoverPanel, ({ run }) => ({
  turns: run.turns,
}))
