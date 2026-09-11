import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fortifiedBody = {
  id: "01a06572-95c5-74dc-a1d6-944caf0e080e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fortified-body",
  title: "Fortified Body",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
