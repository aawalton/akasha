import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingStrike = {
  id: "01a06575-9822-71a7-8734-9ca1cd149baa",
  type: "page-type/world-skill",
  slug: "leaping-strike",
  title: "Leaping Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
