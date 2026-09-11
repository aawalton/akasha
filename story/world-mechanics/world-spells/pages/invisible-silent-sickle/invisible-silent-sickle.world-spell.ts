import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const invisibleSilentSickle = {
  id: "01a06572-95cc-7d8b-8c3d-87658f54b830",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "invisible-silent-sickle",
  title: "Invisible Silent Sickle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
