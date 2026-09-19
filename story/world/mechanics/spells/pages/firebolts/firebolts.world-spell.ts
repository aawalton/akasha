import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const firebolts = {
  id: "01a06572-95c2-7776-a8e0-93059593fcfa",
  type: "page-type/world-spell",
  slug: "firebolts",
  title: "Firebolts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
