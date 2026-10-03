"use client"

import { PlayerCharacterPanel } from "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(PlayerCharacterPanel, ({ run }) => ({
  player: run.player,
  showsCover: true,
  sheet: null,
  turns: run.turns,
  turnsPageTypeSlug: run.turnsPageTypeSlug,
}))
