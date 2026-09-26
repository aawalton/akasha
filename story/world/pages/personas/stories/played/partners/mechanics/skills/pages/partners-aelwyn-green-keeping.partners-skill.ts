import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAelwynGreenKeeping = {
  id: "01a0de4f-5cbc-72a5-bbef-28f98a05df46",
  type: "page-type/partners-skill",
  slug: "partners-aelwyn-green-keeping",
  title: "Green-keeping",
  character: "character-other/partners-aelwyn",
  skill: "world-skill/partners-green-keeping",
} as const satisfies PartnersSkill
