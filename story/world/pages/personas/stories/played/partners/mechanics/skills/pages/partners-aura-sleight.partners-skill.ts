import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAuraSleight = {
  id: "01a0de4f-5cbd-7f59-93b9-89e508d3edfe",
  type: "page-type/partners-skill",
  slug: "partners-aura-sleight",
  title: "Sleight",
  character: "character-other/partners-aura",
  skill: "world-skill/partners-sleight",
} as const satisfies PartnersSkill
