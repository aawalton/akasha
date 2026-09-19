import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const medicalLiaison = {
  id: "01a0657e-0230-73ec-8b45-540eeafb59e3",
  type: "page-type/world-class",
  slug: "medical-liaison",
  title: "Medical Liaison",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
