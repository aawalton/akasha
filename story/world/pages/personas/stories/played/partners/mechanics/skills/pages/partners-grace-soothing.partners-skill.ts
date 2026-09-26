import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersGraceSoothing = {
  id: "01a0de4f-5cbd-7939-84f0-4a2f6c6e6151",
  type: "page-type/partners-skill",
  slug: "partners-grace-soothing",
  title: "Soothing",
  character: "character-other/partners-grace",
  skill: "world-skill/partners-soothing",
} as const satisfies PartnersSkill
