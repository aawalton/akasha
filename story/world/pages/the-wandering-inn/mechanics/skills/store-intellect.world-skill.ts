import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const storeIntellect = {
  id: "01a0657d-02fa-743d-a66c-64aceb40742e",
  type: "page-type/world-skill",
  slug: "store-intellect",
  title: "Store Intellect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
