import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellbreaker = {
  id: "01a0657d-02ed-7686-bd72-b3bd43639383",
  type: "page-type/world-skill",
  slug: "spellbreaker",
  title: "Spellbreaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
