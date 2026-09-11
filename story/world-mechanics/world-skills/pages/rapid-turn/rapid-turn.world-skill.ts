import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const rapidTurn = {
  id: "01a0657d-02a4-77c1-ac68-8fe4a2ab4a1f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "rapid-turn",
  title: "Rapid Turn",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
