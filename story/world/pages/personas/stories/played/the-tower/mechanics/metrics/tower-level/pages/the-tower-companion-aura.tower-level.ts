import type { TowerLevel } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-level/tower-level.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0ca3a-b646-75f8-b14e-5e86f2689a14",
  type: "page-type/tower-level",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 1,
} as const satisfies TowerLevel
