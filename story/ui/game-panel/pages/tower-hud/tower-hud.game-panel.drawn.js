const { metricLabel, poolPanelBy } =
  globalThis.akashaDrawing[
    "akasha/story/ui/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
  ]
const { towerAttributePoint } =
  globalThis.akashaDrawing[
    "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.ts"
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

const MAX = "Max"

export const Panel = poolPanelBy(
  [
    {
      key: towerHealth.slug,
      max: `${towerHealth.slug}${MAX}`,
      color: "red",
      label: metricLabel(towerHealth),
    },
    {
      key: towerMana.slug,
      max: `${towerMana.slug}${MAX}`,
      color: "blue",
      label: metricLabel(towerMana),
    },
    {
      key: towerStamina.slug,
      max: `${towerStamina.slug}${MAX}`,
      color: "green",
      label: metricLabel(towerStamina),
    },
  ],
  towerAttributePoint.slug
)
