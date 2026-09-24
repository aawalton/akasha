import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerLeechGlutColdMouths = {
  id: "01a0d3dd-f2e5-7d4c-a686-9e004315b675",
  type: "page-type/tower-item-damage",
  slug: "the-tower-leech-glut-cold-mouths",
  item: "item/the-tower-leech-glut-cold-mouths",
  value: 9,
} as const satisfies TowerItemDamage
