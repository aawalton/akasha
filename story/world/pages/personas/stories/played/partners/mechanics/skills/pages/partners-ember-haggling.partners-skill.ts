import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersEmberHaggling = {
  id: "01a0de4f-5cbd-7271-8d54-aab430531046",
  type: "page-type/partners-skill",
  slug: "partners-ember-haggling",
  title: "Haggling",
  character: "character-other/partners-ember",
  skill: "world-skill/partners-haggling",
} as const satisfies PartnersSkill
