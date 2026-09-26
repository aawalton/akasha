import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerSage = {
  id: "01a0de18-c3d0-7058-bf2e-b8c6b3712497",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-sage",
  title: "Sage",
  description: "Reframes what the skill is, turning a trick into a discipline of its own.",
} as const satisfies TowerSkillRank
