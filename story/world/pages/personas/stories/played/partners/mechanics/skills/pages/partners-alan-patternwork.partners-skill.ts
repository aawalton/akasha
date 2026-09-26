import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAlanPatternwork = {
  id: "01a0de4f-5cbc-7fa8-ba95-b775032a80a2",
  type: "page-type/partners-skill",
  slug: "partners-alan-patternwork",
  title: "Patternwork",
  character: "character-player/partners-alan",
  skill: "world-skill/partners-patternwork",
  rank: 2,
  uses: 6,
} as const satisfies PartnersSkill
