import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallInventory = {
  id: "01a0657d-02a5-7625-bd37-2804b4af132f",
  type: "page-type/world-skill",
  slug: "recall-inventory",
  title: "Recall Inventory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
