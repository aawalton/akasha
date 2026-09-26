import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAmyLettersAndAccounts = {
  id: "01a0de4f-5cbc-703b-ab45-53503959ed1c",
  type: "page-type/partners-skill",
  slug: "partners-amy-letters-and-accounts",
  title: "Letters & Accounts",
  character: "character-other/partners-amy",
  skill: "world-skill/partners-letters-and-accounts",
} as const satisfies PartnersSkill
