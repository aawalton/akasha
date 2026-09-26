import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAlanEvenKeel = {
  id: "01a0de4e-6838-7ccd-87de-7608b0ae3b9f",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-alan-even-keel",
  title: "Even Keel",
  character: "character-player/partners-ii-alan",
  skill: "world-skill/partners-ii-even-keel",
  rank: 2,
} as const satisfies PartnersIiSkill
