import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const transferManaWard = {
  id: "01a0657d-0316-78e8-a06d-0bac8a69d53b",
  type: "page-type/world-skill",
  slug: "transfer-mana-ward",
  title: "Transfer Mana (Ward)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.742Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
