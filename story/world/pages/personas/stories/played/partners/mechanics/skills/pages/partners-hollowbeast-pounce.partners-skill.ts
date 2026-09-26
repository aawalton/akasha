import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersHollowbeastPounce = {
  id: "01a0de4f-5cbd-7771-8879-6eaf16de2c8c",
  type: "page-type/partners-skill",
  slug: "partners-hollowbeast-pounce",
  title: "Pounce",
  character: "character-other/partners-hollowbeast",
  skill: "world-skill/partners-pounce",
} as const satisfies PartnersSkill
