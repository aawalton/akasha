import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiNatalieCooking = {
  id: "01a0de4e-6839-75fe-ab7b-11965de41b62",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-natalie-cooking",
  title: "Cooking",
  character: "character-other/partners-ii-natalie",
  skill: "world-skill/partners-ii-cooking",
} as const satisfies PartnersIiSkill
