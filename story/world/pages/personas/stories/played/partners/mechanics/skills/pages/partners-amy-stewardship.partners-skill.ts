import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAmyStewardship = {
  id: "01a0de4f-5cbd-7106-818e-760403ad37a9",
  type: "page-type/partners-skill",
  slug: "partners-amy-stewardship",
  title: "Stewardship",
  character: "character-other/partners-amy",
  skill: "world-skill/partners-stewardship",
} as const satisfies PartnersSkill
