import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellstrikeArms = {
  id: "01a0657d-02ed-773e-aded-0b3cc29d6108",
  type: "page-type/world-skill",
  slug: "spellstrike-arms",
  title: "Spellstrike Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
