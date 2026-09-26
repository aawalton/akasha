import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNatalieComfort = {
  id: "01a0de4f-5cbd-7152-98fb-d12d810f1c74",
  type: "page-type/partners-skill",
  slug: "partners-natalie-comfort",
  title: "Comfort",
  character: "character-other/partners-natalie",
  skill: "world-skill/partners-comfort",
} as const satisfies PartnersSkill
