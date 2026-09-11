import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const teachingAssistant = {
  id: "01a0657e-0269-78ac-bc73-c26cbbd42cc3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "teaching-assistant",
  title: "Teaching Assistant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
