import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAbbyReadingPeople = {
  id: "01a0de4e-6837-773a-932d-9bc0d6f313b2",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-abby-reading-people",
  title: "Reading People",
  character: "character-other/partners-ii-abby",
  skill: "world-skill/partners-ii-reading-people",
} as const satisfies PartnersIiSkill
