import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEssenceInfusion = {
  id: "01a0de1d-8eba-738f-8a02-9e1bf52231f6",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-essence-infusion",
  character: "character-player/the-tower-alan",
  skill: "world-skill/the-tower-essence-infusion",
  rank: "tower-skill-rank/the-tower-apprentice",
  level: 6,
  demonstrations: 0,
  axis: "Binding quality: whether the bind holds under pressure, how long it lasts before it bleeds off, and what the focus costs.",
} as const satisfies TowerSkill
