import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const grassyMeadow = {
  id: "01a06572-95c6-7554-b32c-68dc79d65ff8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grassy-meadow",
  title: "Grassy Meadow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
