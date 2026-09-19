import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const berserkerSRage = {
  id: "01a06575-97f5-7d34-b6a7-0029df15960e",
  type: "page-type/world-skill",
  slug: "berserker-s-rage",
  title: "Berserker’s Rage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
