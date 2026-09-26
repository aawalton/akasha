import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersGraceVeilLore = {
  id: "01a0de4f-5cbd-7f0f-9ff1-23d9aabb4d91",
  type: "page-type/partners-skill",
  slug: "partners-grace-veil-lore",
  title: "Veil Lore",
  character: "character-other/partners-grace",
  skill: "world-skill/partners-veil-lore",
} as const satisfies PartnersSkill
