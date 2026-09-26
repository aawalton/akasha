import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiGraceMistwalking = {
  id: "01a0de4e-6838-7f59-9e1b-b97824909380",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-grace-mistwalking",
  title: "Mistwalking",
  character: "character-other/partners-ii-grace",
  skill: "world-skill/partners-ii-mistwalking",
} as const satisfies PartnersIiSkill
