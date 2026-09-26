import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiGraceSoothing = {
  id: "01a0de4e-6838-7b83-934b-79880a78c5bd",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-grace-soothing",
  title: "Soothing",
  character: "character-other/partners-ii-grace",
  skill: "world-skill/partners-ii-soothing",
} as const satisfies PartnersIiSkill
