import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiEmberSmithing = {
  id: "01a0de4e-6838-7c20-af90-3e9986277ba3",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-ember-smithing",
  title: "Smithing",
  character: "character-other/partners-ii-ember",
  skill: "world-skill/partners-ii-smithing",
} as const satisfies PartnersIiSkill
