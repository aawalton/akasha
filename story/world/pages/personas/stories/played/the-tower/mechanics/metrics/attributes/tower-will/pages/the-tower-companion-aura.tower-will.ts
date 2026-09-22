import type { TowerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-will/tower-will.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0ca29-8ad5-7357-97ba-418c4c4947c8",
  type: "page-type/tower-will",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 12,
} as const satisfies TowerWill
