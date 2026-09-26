import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAmyStewardship = {
  id: "01a0de4e-6838-78c4-8861-5c360cbe6369",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-amy-stewardship",
  title: "Stewardship",
  character: "character-other/partners-ii-amy",
  skill: "world-skill/partners-ii-stewardship",
} as const satisfies PartnersIiSkill
