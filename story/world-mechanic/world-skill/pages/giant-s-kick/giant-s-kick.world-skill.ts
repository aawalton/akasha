import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const giantSKick = {
  id: "01a06575-9814-7065-81e4-0f54db041aa0",
  type: "world-skill",
  slug: "giant-s-kick",
  title: "Giant’s Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
