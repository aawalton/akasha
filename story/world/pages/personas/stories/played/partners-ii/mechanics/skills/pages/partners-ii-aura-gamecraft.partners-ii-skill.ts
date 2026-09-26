import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAuraGamecraft = {
  id: "01a0de4e-6838-7f62-bd13-9ebb6b506b7b",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-aura-gamecraft",
  title: "Gamecraft",
  character: "character-other/partners-ii-aura",
  skill: "world-skill/partners-ii-gamecraft",
} as const satisfies PartnersIiSkill
