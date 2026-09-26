import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAelwynWardship = {
  id: "01a0de4f-5cbc-7959-8fab-be1ffe01d937",
  type: "page-type/partners-skill",
  slug: "partners-aelwyn-wardship",
  title: "Wardship",
  character: "character-other/partners-aelwyn",
  skill: "world-skill/partners-wardship",
} as const satisfies PartnersSkill
