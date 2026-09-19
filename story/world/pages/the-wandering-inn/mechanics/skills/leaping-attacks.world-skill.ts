import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingAttacks = {
  id: "01a06575-9822-7fd3-a96e-c5838b972d43",
  type: "page-type/world-skill",
  slug: "leaping-attacks",
  title: "Leaping Attacks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
