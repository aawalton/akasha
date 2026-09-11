import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const empoweredCasting = {
  id: "01a06575-9808-7944-b55f-bf99b1ffad1c",
  type: "world-skill",
  slug: "empowered-casting",
  title: "Empowered Casting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
