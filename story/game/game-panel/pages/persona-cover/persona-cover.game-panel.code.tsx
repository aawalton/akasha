"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import { PersonaCoverPanel } from "akasha/story/ui/modules/persona-cover-panel/persona-cover-panel.module.code.tsx"

export const Panel = panelBy(PersonaCoverPanel, ({ run }) => ({
  turns: run.turns,
}))
