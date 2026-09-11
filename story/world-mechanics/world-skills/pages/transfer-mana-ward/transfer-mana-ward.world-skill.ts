import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const transferManaWard = {
  id: "01a0657d-0316-78e8-a06d-0bac8a69d53b",
  type: "world-skill",
  slug: "transfer-mana-ward",
  title: "Transfer Mana (Ward)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
