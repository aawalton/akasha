import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const graceOfGod = {
  id: "01a06572-95c6-72e4-8cc4-cdd4cab08c01",
  type: "page-type/world-spell",
  slug: "grace-of-god",
  title: "Grace of God",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
