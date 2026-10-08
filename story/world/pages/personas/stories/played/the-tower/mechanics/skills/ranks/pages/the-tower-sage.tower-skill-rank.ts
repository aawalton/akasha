import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerSage = {
  id: "01a0de18-c3d0-7058-bf2e-b8c6b3712497",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-sage",
  title: "Sage",
  place: 7,
  description: "Reframes what the skill is, turning a trick into a discipline of its own.",
  createdAt: "2026-09-26T14:22:40.080Z",
  updatedAt: "2026-09-26T17:58:48.000Z",
} as const satisfies TowerSkillRank
