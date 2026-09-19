import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalRebuke = {
  id: "01a0657d-02b7-756a-8e23-9e44e6b63c18",
  type: "page-type/world-skill",
  slug: "royal-rebuke",
  title: "Royal Rebuke",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
