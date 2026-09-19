import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mortalEnemySlavers = {
  id: "01a0657d-026f-7429-b152-ff5d263eae1d",
  type: "page-type/world-skill",
  slug: "mortal-enemy-slavers",
  title: "Mortal Enemy: Slavers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
