import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cryptGuardian = {
  id: "01a0657e-01ce-789f-891a-1c7ef22f7080",
  type: "page-type/world-class",
  slug: "crypt-guardian",
  title: "Crypt Guardian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
