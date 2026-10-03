"use client"

import { PlayerIntentPanel } from "akasha/story/ui/modules/player-intent-panel/player-intent-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(PlayerIntentPanel, ({ run }) => ({
  storyAddress: run.storyAddress,
  intent: run.intent,
}))
