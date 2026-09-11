import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const invisibilityPurge = {
  id: "01a06572-95cb-759c-86ad-20acde1d3db4",
  type: "world-spell",
  slug: "invisibility-purge",
  title: "Invisibility Purge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
