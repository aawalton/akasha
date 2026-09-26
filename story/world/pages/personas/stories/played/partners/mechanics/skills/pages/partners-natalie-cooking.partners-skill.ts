import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNatalieCooking = {
  id: "01a0de4f-5cbd-75a6-97d5-648c0bdc20a2",
  type: "page-type/partners-skill",
  slug: "partners-natalie-cooking",
  title: "Cooking",
  character: "character-other/partners-natalie",
  skill: "world-skill/partners-cooking",
} as const satisfies PartnersSkill
