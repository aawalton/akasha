import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAuraFootwork = {
  id: "01a0de4e-6838-711c-9bbd-c0c53a46ae65",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-aura-footwork",
  title: "Footwork",
  character: "character-other/partners-ii-aura",
  skill: "world-skill/partners-ii-footwork",
} as const satisfies PartnersIiSkill
