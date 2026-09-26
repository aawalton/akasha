import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAbbyDiscretion = {
  id: "01a0de4f-5cbc-77ef-8e8d-61d258a77fdc",
  type: "page-type/partners-skill",
  slug: "partners-abby-discretion",
  title: "Discretion",
  character: "character-other/partners-abby",
  skill: "world-skill/partners-discretion",
} as const satisfies PartnersSkill
