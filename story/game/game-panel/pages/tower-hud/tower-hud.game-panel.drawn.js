const { metricLabel, poolPanelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
  ]
const { towerHealth } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
  ]
const { towerMana } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
  ]
const { towerStamina } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-stamina/tower-stamina.page-type.ts"
  ]

export const Panel = poolPanelBy([
  { key: "health", max: "healthMax", color: "red", label: metricLabel(towerHealth) },
  { key: "mana", max: "manaMax", color: "blue", label: metricLabel(towerMana) },
  { key: "stamina", max: "staminaMax", color: "green", label: metricLabel(towerStamina) },
])
