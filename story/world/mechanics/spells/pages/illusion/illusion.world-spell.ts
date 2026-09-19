import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const illusion = {
  id: "01a06572-95cb-7052-b551-f797fc5f0445",
  type: "page-type/world-spell",
  slug: "illusion",
  title: "Illusion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
