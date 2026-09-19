import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const storageCrates = {
  id: "01a0657d-02fa-7206-a901-7411b2c71205",
  type: "page-type/world-skill",
  slug: "storage-crates",
  title: "Storage Crates",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
