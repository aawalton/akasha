import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const braceTheDeck = {
  id: "01a06575-97f8-7504-9575-8cca59e4afb3",
  type: "world-skill",
  slug: "brace-the-deck",
  title: "Brace the Deck",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
