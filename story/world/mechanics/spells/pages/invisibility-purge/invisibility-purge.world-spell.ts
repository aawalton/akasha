import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibilityPurge = {
  id: "01a06572-95cb-759c-86ad-20acde1d3db4",
  type: "page-type/world-spell",
  slug: "invisibility-purge",
  title: "Invisibility Purge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
