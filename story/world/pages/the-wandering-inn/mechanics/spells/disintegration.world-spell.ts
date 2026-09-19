import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegration = {
  id: "01a06572-95bd-7bf7-9cfd-dfbf227087cd",
  type: "page-type/world-spell",
  slug: "disintegration",
  title: "Disintegration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
