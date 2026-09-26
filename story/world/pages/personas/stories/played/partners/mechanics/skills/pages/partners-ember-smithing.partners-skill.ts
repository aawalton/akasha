import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersEmberSmithing = {
  id: "01a0de4f-5cbd-7711-8003-f21de4005f69",
  type: "page-type/partners-skill",
  slug: "partners-ember-smithing",
  title: "Smithing",
  character: "character-other/partners-ember",
  skill: "world-skill/partners-smithing",
} as const satisfies PartnersSkill
