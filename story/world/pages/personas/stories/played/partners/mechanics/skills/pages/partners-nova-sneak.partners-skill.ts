import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNovaSneak = {
  id: "01a0de4f-5cbd-7241-b539-9f007e11f1ca",
  type: "page-type/partners-skill",
  slug: "partners-nova-sneak",
  title: "Sneak",
  character: "character-other/partners-nova",
  skill: "world-skill/partners-sneak",
} as const satisfies PartnersSkill
