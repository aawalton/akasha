"use client"

import { panelBy } from "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx"
import {
  metricLabel,
  poolPanelBy,
} from "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import { towerStamina } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts"

const OFFERING = "akashaDrawing"

const OFFERED: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  "akasha/story/game/game-panel/modules/panel-showing/panel-showing.module.code.tsx": { panelBy },
  "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx": {
    metricLabel,
    poolPanelBy,
  },
  "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx": { HudPanel },
  "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx": { QuestsPanel },
  "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx": { SheetPanel },
  "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx": { StorySoFar },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts":
    { towerHealth },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts":
    { towerMana },
  "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts":
    { towerStamina },
}

export function offerDrawing(): undefined {
  Object.assign(globalThis, { [OFFERING]: OFFERED })
}
