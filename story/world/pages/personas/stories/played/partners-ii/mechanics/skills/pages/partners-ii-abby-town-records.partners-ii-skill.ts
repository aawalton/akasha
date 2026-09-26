import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAbbyTownRecords = {
  id: "01a0de4e-6837-7871-920b-a810b75d0843",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-abby-town-records",
  title: "Town Records",
  character: "character-other/partners-ii-abby",
  skill: "world-skill/partners-ii-town-records",
} as const satisfies PartnersIiSkill
