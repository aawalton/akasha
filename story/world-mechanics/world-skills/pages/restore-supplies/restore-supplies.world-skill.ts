import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const restoreSupplies = {
  id: "01a0657d-02b1-73ff-a100-c7c665002174",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "restore-supplies",
  title: "Restore Supplies",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
