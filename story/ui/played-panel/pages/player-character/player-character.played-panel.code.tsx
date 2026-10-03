"use client"

import { PlayerCharacterPanel } from "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
import { statsShownIn } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(PlayerCharacterPanel, ({ envelope, run }) => ({
  player: run.player,
  present: run.present,
  showsCover: true,
  sheet: {
    sheet: envelope.sheet ?? null,
    game: run.gameExternalId,
    showsStats: statsShownIn(envelope.sheet),
    showsBonds: true,
  },
  turns: run.turns,
  turnsPageTypeSlug: run.turnsPageTypeSlug,
}))
