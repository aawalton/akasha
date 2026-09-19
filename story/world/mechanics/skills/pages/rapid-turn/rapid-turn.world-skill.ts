import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidTurn = {
  id: "01a0657d-02a4-77c1-ac68-8fe4a2ab4a1f",
  type: "page-type/world-skill",
  slug: "rapid-turn",
  title: "Rapid Turn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
