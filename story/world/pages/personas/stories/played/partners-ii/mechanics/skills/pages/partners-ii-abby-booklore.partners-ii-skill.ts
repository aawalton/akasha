import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAbbyBooklore = {
  id: "01a0de4e-6837-74ee-9e42-f269170b8deb",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-abby-booklore",
  title: "Booklore",
  character: "character-other/partners-ii-abby",
  skill: "world-skill/partners-ii-booklore",
} as const satisfies PartnersIiSkill
