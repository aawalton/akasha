import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAbbyTownRecords = {
  id: "01a0de4f-5cbc-733e-8bab-3d1ef6b02bbd",
  type: "page-type/partners-skill",
  slug: "partners-abby-town-records",
  title: "Town Records",
  character: "character-other/partners-abby",
  skill: "world-skill/partners-town-records",
} as const satisfies PartnersSkill
