import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiEmberHammerfight = {
  id: "01a0de4e-6838-721b-af71-87bc4d82cdf6",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-ember-hammerfight",
  title: "Hammerfight",
  character: "character-other/partners-ii-ember",
  skill: "world-skill/partners-ii-hammerfight",
} as const satisfies PartnersIiSkill
