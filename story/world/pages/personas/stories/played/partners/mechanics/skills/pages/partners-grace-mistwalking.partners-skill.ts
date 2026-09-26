import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersGraceMistwalking = {
  id: "01a0de4f-5cbd-7c05-9979-bcd3510f7249",
  type: "page-type/partners-skill",
  slug: "partners-grace-mistwalking",
  title: "Mistwalking",
  character: "character-other/partners-grace",
  skill: "world-skill/partners-mistwalking",
} as const satisfies PartnersSkill
