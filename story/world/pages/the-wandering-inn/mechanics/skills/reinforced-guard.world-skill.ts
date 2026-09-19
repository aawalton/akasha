import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforcedGuard = {
  id: "01a0657d-02a6-7681-a06c-c3b587b3042b",
  type: "page-type/world-skill",
  slug: "reinforced-guard",
  title: "Reinforced Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
