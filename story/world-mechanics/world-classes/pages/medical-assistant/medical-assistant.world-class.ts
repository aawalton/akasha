import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const medicalAssistant = {
  id: "01a0657e-139f-7c1b-9f71-fa5b14d4e511",
  type: "world-class",
  slug: "medical-assistant",
  title: "Medical Assistant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
