import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidSphere = {
  id: "01a06572-95e8-7b86-890b-040c7c7d1328",
  type: "page-type/world-spell",
  slug: "void-sphere",
  title: "Void Sphere",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
