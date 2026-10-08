import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerNovice = {
  id: "01a0de18-c3d0-71d8-8fe2-e863ad264296",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-novice",
  title: "Novice",
  place: 1,
  description: "Has found the skill and not yet entered it.",
  width: 5,
  createdAt: "2026-09-26T14:22:40.080Z",
  updatedAt: "2026-09-26T17:58:48.000Z",
} as const satisfies TowerSkillRank
