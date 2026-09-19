import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deckbreakerSHammer = {
  id: "01a06575-9802-747d-9e0e-614dba669de8",
  type: "page-type/world-skill",
  slug: "deckbreaker-s-hammer",
  title: "Deckbreaker’s Hammer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
