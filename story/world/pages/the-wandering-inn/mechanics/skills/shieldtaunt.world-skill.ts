import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldtaunt = {
  id: "01a0657d-02c0-7824-9a9d-e72d34d2e28b",
  type: "page-type/world-skill",
  slug: "shieldtaunt",
  title: "Shieldtaunt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
