import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const assistant = {
  id: "01a0657e-01ae-7cb0-943c-90a496289039",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "assistant",
  title: "Assistant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
