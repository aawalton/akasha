import type { TowerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.types.ts"

export const theTowerGrandmaster = {
  id: "01a0de18-c3d0-78dc-9088-3e813a24af83",
  type: "page-type/tower-skill-rank",
  slug: "the-tower-grandmaster",
  title: "Grandmaster",
  place: 6,
  description: "Adds to the art with an original technique no master taught.",
  width: 250,
  createdAt: "2026-09-26T14:22:40.080Z",
  updatedAt: "2026-09-26T17:58:48.000Z",
} as const satisfies TowerSkillRank
