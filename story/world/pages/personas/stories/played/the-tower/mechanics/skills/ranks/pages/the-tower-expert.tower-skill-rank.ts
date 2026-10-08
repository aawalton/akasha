import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerExpert = {
  id: "01a0de18-c3cf-724d-a7e9-9059a2bfa1fb",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-expert",
  title: "Expert",
  place: 4,
  description: "Does it unprompted, answering an opening they spotted with a move of their own.",
  width: 50,
  createdAt: "2026-09-26T14:22:40.079Z",
  updatedAt: "2026-09-26T17:58:48.000Z",
} as const satisfies TowerSkillRank
