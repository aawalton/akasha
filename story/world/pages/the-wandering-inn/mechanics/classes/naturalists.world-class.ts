import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const naturalists = {
  id: "01a0657e-0234-723e-be24-0dbfcde22dde",
  type: "page-type/world-class",
  slug: "naturalists",
  title: "Naturalists",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
} as const satisfies WorldClass
