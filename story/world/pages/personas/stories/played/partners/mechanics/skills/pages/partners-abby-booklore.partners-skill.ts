import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAbbyBooklore = {
  id: "01a0de4f-5cbb-7129-8760-a2599452ee0b",
  type: "page-type/partners-skill",
  slug: "partners-abby-booklore",
  title: "Booklore",
  character: "character-other/partners-abby",
  skill: "world-skill/partners-booklore",
} as const satisfies PartnersSkill
