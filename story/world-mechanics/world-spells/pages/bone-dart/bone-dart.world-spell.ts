import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boneDart = {
  id: "01a06572-95b7-7575-8c8a-0759a5542f1c",
  type: "world-spell",
  slug: "bone-dart",
  title: "Bone Dart",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
