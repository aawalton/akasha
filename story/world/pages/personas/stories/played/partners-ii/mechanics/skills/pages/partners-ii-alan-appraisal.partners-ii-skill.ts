import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAlanAppraisal = {
  id: "01a0de4e-6838-7966-bb8f-2cc665033946",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-alan-appraisal",
  title: "Appraisal",
  character: "character-player/partners-ii-alan",
  skill: "world-skill/partners-ii-appraisal",
  rank: 1,
} as const satisfies PartnersIiSkill
