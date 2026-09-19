import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const soporificDust = {
  id: "01a06572-95e1-74df-b2bd-27bfd811790c",
  type: "page-type/world-spell",
  slug: "soporific-dust",
  title: "Soporific Dust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
