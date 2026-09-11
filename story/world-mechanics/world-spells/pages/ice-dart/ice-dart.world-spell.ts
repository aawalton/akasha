import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceDart = {
  id: "01a06572-95c9-7a3d-be44-00b8fa13b94d",
  type: "world-spell",
  slug: "ice-dart",
  title: "Ice Dart",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
