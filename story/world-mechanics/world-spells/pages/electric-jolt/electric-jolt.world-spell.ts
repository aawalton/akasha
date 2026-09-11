import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const electricJolt = {
  id: "01a06572-95bf-78e0-995c-6d94ebbb1ac2",
  type: "world-spell",
  slug: "electric-jolt",
  title: "Electric Jolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
