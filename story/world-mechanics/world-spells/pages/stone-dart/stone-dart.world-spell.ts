import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneDart = {
  id: "01a06572-95e3-7ea3-9295-b2e0d06d2f7a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-dart",
  title: "Stone Dart",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
