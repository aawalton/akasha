import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reduceSpell = {
  id: "01a0657d-02a6-749d-a9e1-cf63694339ea",
  type: "page-type/world-skill",
  slug: "reduce-spell",
  title: "Reduce Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
