import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerMaster = {
  id: "01a0de18-c3d0-72ef-9e90-e252473ecce4",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-master",
  title: "Master",
  description: "Knows its principles, can teach it, and knows exactly where it stops working.",
  width: 100,
} as const satisfies TowerSkillRank
