import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const teachingAssistant = {
  id: "01a0657e-0269-78ac-bc73-c26cbbd42cc3",
  type: "page-type/world-class",
  slug: "teaching-assistant",
  title: "Teaching Assistant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
