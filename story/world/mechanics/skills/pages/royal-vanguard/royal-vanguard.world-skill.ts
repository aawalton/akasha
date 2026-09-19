import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalVanguard = {
  id: "01a0657d-02b7-7021-b1ab-bf07948f752e",
  type: "page-type/world-skill",
  slug: "royal-vanguard",
  title: "Royal Vanguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
