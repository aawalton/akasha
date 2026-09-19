import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceElemental = {
  id: "01a06572-95c9-7c05-a2ea-a3b67ca30dbf",
  type: "page-type/world-spell",
  slug: "ice-elemental",
  title: "Ice Elemental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
