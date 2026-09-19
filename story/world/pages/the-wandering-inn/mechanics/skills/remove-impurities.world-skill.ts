import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeImpurities = {
  id: "01a0657d-02b0-7837-892a-db8469d5670a",
  type: "page-type/world-skill",
  slug: "remove-impurities",
  title: "Remove Impurities",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
