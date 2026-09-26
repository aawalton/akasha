import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiHollowbeastPounce = {
  id: "01a0de4e-6839-7d9e-b1ef-3aa02f0ee579",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-hollowbeast-pounce",
  title: "Pounce",
  character: "character-other/partners-ii-hollowbeast",
  skill: "world-skill/partners-ii-pounce",
} as const satisfies PartnersIiSkill
