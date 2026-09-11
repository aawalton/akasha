import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const featherfell = {
  id: "01a06572-95c0-7d0c-825d-2e30d46f3e33",
  type: "world-spell",
  slug: "featherfell",
  title: "Featherfell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
