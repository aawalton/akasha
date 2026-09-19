import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const geas = {
  id: "01a06572-95c6-7e79-9d7d-d8940175625a",
  type: "page-type/world-spell",
  slug: "geas",
  title: "Geas",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
