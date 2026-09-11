import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicDart = {
  id: "01a06572-95d0-7053-b762-d62d505e7562",
  type: "world-spell",
  slug: "magic-dart",
  title: "Magic Dart",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
