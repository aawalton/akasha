import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAlanAppraisal = {
  id: "01a0de4f-5cbc-7ca2-bc7c-c5187b2c6af3",
  type: "page-type/partners-skill",
  slug: "partners-alan-appraisal",
  title: "Appraisal",
  character: "character-player/partners-alan",
  skill: "world-skill/partners-appraisal",
  rank: 1,
  uses: 6,
} as const satisfies PartnersSkill
