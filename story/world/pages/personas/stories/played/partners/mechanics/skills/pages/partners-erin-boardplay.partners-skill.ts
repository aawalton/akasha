import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersErinBoardplay = {
  id: "01a0de4f-5cbd-7b16-9ee1-ea7b660e3839",
  type: "page-type/partners-skill",
  slug: "partners-erin-boardplay",
  title: "Boardplay",
  character: "character-other/partners-erin",
  skill: "world-skill/partners-boardplay",
} as const satisfies PartnersSkill
