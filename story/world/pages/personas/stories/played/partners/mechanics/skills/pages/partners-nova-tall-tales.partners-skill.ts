import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNovaTallTales = {
  id: "01a0de4f-5cbe-7e13-9120-f6e0facc58fe",
  type: "page-type/partners-skill",
  slug: "partners-nova-tall-tales",
  title: "Tall Tales",
  character: "character-other/partners-nova",
  skill: "world-skill/partners-tall-tales",
} as const satisfies PartnersSkill
