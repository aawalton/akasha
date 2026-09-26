import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAuraOddsReading = {
  id: "01a0de4e-6838-7f48-bb68-924f20e84481",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-aura-odds-reading",
  title: "Odds-reading",
  character: "character-other/partners-ii-aura",
  skill: "world-skill/partners-ii-odds-reading",
} as const satisfies PartnersIiSkill
