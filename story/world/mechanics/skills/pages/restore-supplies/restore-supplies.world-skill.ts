import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreSupplies = {
  id: "01a0657d-02b1-73ff-a100-c7c665002174",
  type: "page-type/world-skill",
  slug: "restore-supplies",
  title: "Restore Supplies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
