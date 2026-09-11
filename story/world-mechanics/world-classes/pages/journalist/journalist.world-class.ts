import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const journalist = {
  id: "01a0657e-1377-7570-9aae-0461f1a81461",
  type: "world-class",
  slug: "journalist",
  title: "Journalist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
