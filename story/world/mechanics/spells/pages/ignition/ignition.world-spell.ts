import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ignition = {
  id: "01a06572-95cb-7394-b297-ca3c3b6fece5",
  type: "page-type/world-spell",
  slug: "ignition",
  title: "Ignition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
