import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiNovaSneak = {
  id: "01a0de4e-6839-7f55-a241-4e2d848b351e",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-nova-sneak",
  title: "Sneak",
  character: "character-other/partners-ii-nova",
  skill: "world-skill/partners-ii-sneak",
} as const satisfies PartnersIiSkill
