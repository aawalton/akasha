import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersErinInnkeeping = {
  id: "01a0de4f-5cbd-7f26-b440-9c610ddb7036",
  type: "page-type/partners-skill",
  slug: "partners-erin-innkeeping",
  title: "Innkeeping",
  character: "character-other/partners-erin",
  skill: "world-skill/partners-innkeeping",
} as const satisfies PartnersSkill
