import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const invisibleSilentSickle = {
  id: "01a06572-95cc-7d8b-8c3d-87658f54b830",
  type: "world-spell",
  slug: "invisible-silent-sickle",
  title: "Invisible Silent Sickle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
