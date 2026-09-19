import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyguardSShield = {
  id: "01a06575-97f7-7880-8368-b1bc4d1d911d",
  type: "page-type/world-skill",
  slug: "bodyguard-s-shield",
  title: "Bodyguard’s Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
