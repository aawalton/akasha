import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerApprentice = {
  id: "01a0de18-c3cf-7e59-b69b-e1c94cd35f84",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-apprentice",
  title: "Apprentice",
  place: 2,
  description: "Sees when the skill would help, and cannot yet produce it under pressure.",
  width: 10,
  createdAt: "2026-09-26T14:22:40.079Z",
  updatedAt: "2026-09-26T17:58:48.000Z",
} as const satisfies TowerSkillRank
