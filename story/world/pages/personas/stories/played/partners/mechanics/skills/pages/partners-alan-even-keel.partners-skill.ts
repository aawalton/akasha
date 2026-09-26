import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAlanEvenKeel = {
  id: "01a0de4f-5cbc-7843-88c5-1fd65d257056",
  type: "page-type/partners-skill",
  slug: "partners-alan-even-keel",
  title: "Even Keel",
  character: "character-player/partners-alan",
  skill: "world-skill/partners-even-keel",
  rank: 2,
} as const satisfies PartnersSkill
