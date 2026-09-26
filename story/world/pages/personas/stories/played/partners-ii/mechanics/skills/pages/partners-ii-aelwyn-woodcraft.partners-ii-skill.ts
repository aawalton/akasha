import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAelwynWoodcraft = {
  id: "01a0de4e-6838-76ad-8742-09d074583a97",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-aelwyn-woodcraft",
  title: "Woodcraft",
  character: "character-other/partners-ii-aelwyn",
  skill: "world-skill/partners-ii-woodcraft",
} as const satisfies PartnersIiSkill
