import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ignition = {
  id: "01a06572-95cb-7394-b297-ca3c3b6fece5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ignition",
  title: "Ignition",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
