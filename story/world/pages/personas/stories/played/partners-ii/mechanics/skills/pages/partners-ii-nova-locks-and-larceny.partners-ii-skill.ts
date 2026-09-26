import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiNovaLocksAndLarceny = {
  id: "01a0de4e-6839-7558-b12f-e1314f3619dc",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-nova-locks-and-larceny",
  title: "Locks & Larceny",
  character: "character-other/partners-ii-nova",
  skill: "world-skill/partners-ii-locks-and-larceny",
} as const satisfies PartnersIiSkill
