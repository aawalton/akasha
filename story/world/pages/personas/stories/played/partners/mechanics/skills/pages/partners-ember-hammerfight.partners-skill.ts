import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersEmberHammerfight = {
  id: "01a0de4f-5cbd-7df9-9825-aa4fca110dca",
  type: "page-type/partners-skill",
  slug: "partners-ember-hammerfight",
  title: "Hammerfight",
  character: "character-other/partners-ember",
  skill: "world-skill/partners-hammerfight",
} as const satisfies PartnersSkill
