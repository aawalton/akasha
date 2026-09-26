import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAuraFootwork = {
  id: "01a0de4f-5cbd-7aa9-953b-e91c7bf3d3f9",
  type: "page-type/partners-skill",
  slug: "partners-aura-footwork",
  title: "Footwork",
  character: "character-other/partners-aura",
  skill: "world-skill/partners-footwork",
} as const satisfies PartnersSkill
