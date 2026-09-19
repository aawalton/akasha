import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalSlash = {
  id: "01a0657d-02b7-7106-9bf8-03d9a3764843",
  type: "page-type/world-skill",
  slug: "royal-slash",
  title: "Royal Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
