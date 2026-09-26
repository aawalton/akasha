import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAuraGamecraft = {
  id: "01a0de4f-5cbd-7404-9dc4-72d001b7de32",
  type: "page-type/partners-skill",
  slug: "partners-aura-gamecraft",
  title: "Gamecraft",
  character: "character-other/partners-aura",
  skill: "world-skill/partners-gamecraft",
} as const satisfies PartnersSkill
