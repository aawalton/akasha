import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ashenManaWell = {
  id: "01a06575-97ed-7029-8999-b45a401ac031",
  type: "page-type/world-skill",
  slug: "ashen-mana-well",
  title: "Ashen Mana Well",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
