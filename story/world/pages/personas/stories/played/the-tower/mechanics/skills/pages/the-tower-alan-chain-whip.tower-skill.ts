import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanChainWhip = {
  id: "01a0de1d-8eb9-79a2-b3c8-22187df5da1a",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-chain-whip",
  title: "Chain Whip",
  character: "character-player/the-tower-alan",
  rank: "tower-skill-rank/the-tower-novice",
  level: 3,
  demonstrations: 0,
} as const satisfies TowerSkill
