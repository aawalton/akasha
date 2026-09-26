"use client"

import {
  metricLabel,
  poolPanelBy,
} from "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import { towerStamina } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts"

export const Panel = poolPanelBy([
  { key: "health", max: "healthMax", color: "red", label: metricLabel(towerHealth) },
  { key: "mana", max: "manaMax", color: "blue", label: metricLabel(towerMana) },
  { key: "stamina", max: "staminaMax", color: "green", label: metricLabel(towerStamina) },
])
