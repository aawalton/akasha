import type { TowerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0ca29-59fd-7556-93b3-c3d4734e4a49",
  type: "page-type/tower-vitality",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 12,
} as const satisfies TowerVitality
