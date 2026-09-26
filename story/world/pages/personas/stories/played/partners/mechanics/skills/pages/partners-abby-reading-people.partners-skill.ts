import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAbbyReadingPeople = {
  id: "01a0de4f-5cbc-7d37-bcc8-e849894c6c22",
  type: "page-type/partners-skill",
  slug: "partners-abby-reading-people",
  title: "Reading People",
  character: "character-other/partners-abby",
  skill: "world-skill/partners-reading-people",
} as const satisfies PartnersSkill
