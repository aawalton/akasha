import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanSmithing = {
  id: "01a0de1d-8eba-766a-90a9-51fa96a3ff8c",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-smithing",
  title: "Smithing",
  character: "character-player/the-tower-alan",
  skill: "world-skill/the-tower-smithing",
  rank: "tower-skill-rank/the-tower-apprentice",
  level: 1,
  demonstrations: 0,
  axis: "The quality of the product: its integrity, its balance and how secure its joins are.",
} as const satisfies TowerSkill
