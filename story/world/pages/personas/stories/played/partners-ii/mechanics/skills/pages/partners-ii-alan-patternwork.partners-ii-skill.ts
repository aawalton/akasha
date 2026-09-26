import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAlanPatternwork = {
  id: "01a0de4e-6838-7bbb-9ae9-a5e996c0e67b",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-alan-patternwork",
  title: "Patternwork",
  character: "character-player/partners-ii-alan",
  skill: "world-skill/partners-ii-patternwork",
  rank: 2,
} as const satisfies PartnersIiSkill
