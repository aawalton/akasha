import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersHollowbeastStalk = {
  id: "01a0de4f-5cbd-7eab-aa55-07e28704e5e9",
  type: "page-type/partners-skill",
  slug: "partners-hollowbeast-stalk",
  title: "Stalk",
  character: "character-other/partners-hollowbeast",
  skill: "world-skill/partners-stalk",
} as const satisfies PartnersSkill
