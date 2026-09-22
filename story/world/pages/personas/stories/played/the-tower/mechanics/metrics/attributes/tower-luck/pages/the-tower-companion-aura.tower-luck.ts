import type { TowerLuck } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-luck/tower-luck.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0ca29-abb5-74ae-97ad-87b577f2497c",
  type: "page-type/tower-luck",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 15,
} as const satisfies TowerLuck
