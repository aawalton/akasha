import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAuraOddsReading = {
  id: "01a0de4f-5cbd-7310-9643-420bbba4e292",
  type: "page-type/partners-skill",
  slug: "partners-aura-odds-reading",
  title: "Odds-reading",
  character: "character-other/partners-aura",
  skill: "world-skill/partners-odds-reading",
} as const satisfies PartnersSkill
