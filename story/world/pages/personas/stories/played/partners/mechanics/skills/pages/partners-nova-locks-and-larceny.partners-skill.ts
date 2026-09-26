import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNovaLocksAndLarceny = {
  id: "01a0de4f-5cbd-78ec-8f50-4b6ba76278d2",
  type: "page-type/partners-skill",
  slug: "partners-nova-locks-and-larceny",
  title: "Locks & Larceny",
  character: "character-other/partners-nova",
  skill: "world-skill/partners-locks-and-larceny",
} as const satisfies PartnersSkill
