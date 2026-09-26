import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAmyReadingPeople = {
  id: "01a0de4f-5cbd-7abe-996b-cd381a14c913",
  type: "page-type/partners-skill",
  slug: "partners-amy-reading-people",
  title: "Reading People",
  character: "character-other/partners-amy",
  skill: "world-skill/partners-reading-people",
} as const satisfies PartnersSkill
