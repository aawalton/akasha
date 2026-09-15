import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const assistant = {
  id: "01a0657e-01ae-7cb0-943c-90a496289039",
  type: "world-class",
  slug: "assistant",
  title: "Assistant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
