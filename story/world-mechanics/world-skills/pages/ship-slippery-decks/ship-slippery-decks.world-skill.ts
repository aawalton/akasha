import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shipSlipperyDecks = {
  id: "01a0657d-02c1-7d19-97f3-485cb7666b3a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ship-slippery-decks",
  title: "Ship: Slippery Decks",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
