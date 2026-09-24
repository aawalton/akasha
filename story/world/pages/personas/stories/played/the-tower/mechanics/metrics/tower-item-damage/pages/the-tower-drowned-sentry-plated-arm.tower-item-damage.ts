import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerDrownedSentryPlatedArm = {
  id: "01a0d3db-ff59-7fc8-a5e9-5c5d3104e1fd",
  type: "page-type/tower-item-damage",
  slug: "the-tower-drowned-sentry-plated-arm",
  item: "item/the-tower-drowned-sentry-plated-arm",
  value: 14,
} as const satisfies TowerItemDamage
