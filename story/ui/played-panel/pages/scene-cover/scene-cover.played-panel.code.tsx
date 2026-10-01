"use client"

import { SceneCoverPanel } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { panelBy } from "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

export const Panel = panelBy(SceneCoverPanel, ({ run }) => ({
  turns: run.turns,
  turnCovers: run.turnCovers,
  areScenes: run.coversAreScenes === true,
  gameExternalId: run.gameExternalId,
}))
