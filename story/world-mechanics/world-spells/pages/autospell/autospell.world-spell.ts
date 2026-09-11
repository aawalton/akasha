import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const autospell = {
  id: "01a06572-95b5-70e8-a06e-fe7eeb712684",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "autospell",
  title: "Autospell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
