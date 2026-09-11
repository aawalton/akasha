import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const arcaneManaWell = {
  id: "01a06575-97ec-7356-a716-8fbaa2677dfc",
  type: "world-skill",
  slug: "arcane-mana-well",
  title: "Arcane Mana Well",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
