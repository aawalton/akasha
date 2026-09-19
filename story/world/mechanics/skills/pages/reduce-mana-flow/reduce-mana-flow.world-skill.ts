import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reduceManaFlow = {
  id: "01a0657d-02a6-7985-9b4a-34a773296003",
  type: "page-type/world-skill",
  slug: "reduce-mana-flow",
  title: "Reduce Mana Flow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
