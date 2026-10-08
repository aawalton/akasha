import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallInventory = {
  id: "01a0657d-02a5-7625-bd37-2804b4af132f",
  type: "page-type/world-skill",
  slug: "recall-inventory",
  title: "Recall Inventory",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.629Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
