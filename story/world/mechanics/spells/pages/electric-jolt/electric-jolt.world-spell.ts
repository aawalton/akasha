import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const electricJolt = {
  id: "01a06572-95bf-78e0-995c-6d94ebbb1ac2",
  type: "page-type/world-spell",
  slug: "electric-jolt",
  title: "Electric Jolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
