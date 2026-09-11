import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leapingStrike = {
  id: "01a06575-9822-71a7-8734-9ca1cd149baa",
  type: "world-skill",
  slug: "leaping-strike",
  title: "Leaping Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
