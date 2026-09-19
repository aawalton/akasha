import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcaneManaWell = {
  id: "01a06575-97ec-7356-a716-8fbaa2677dfc",
  type: "page-type/world-skill",
  slug: "arcane-mana-well",
  title: "Arcane Mana Well",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
