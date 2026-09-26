import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAelwynWoodcraft = {
  id: "01a0de4f-5cbc-7759-97e4-50ca88bc1936",
  type: "page-type/partners-skill",
  slug: "partners-aelwyn-woodcraft",
  title: "Woodcraft",
  character: "character-other/partners-aelwyn",
  skill: "world-skill/partners-woodcraft",
} as const satisfies PartnersSkill
