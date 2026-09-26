import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAelwynBowAndStave = {
  id: "01a0de4f-5cbc-7a73-aca4-7a9815a10ced",
  type: "page-type/partners-skill",
  slug: "partners-aelwyn-bow-and-stave",
  title: "Bow & Stave",
  character: "character-other/partners-aelwyn",
  skill: "world-skill/partners-bow-and-stave",
} as const satisfies PartnersSkill
