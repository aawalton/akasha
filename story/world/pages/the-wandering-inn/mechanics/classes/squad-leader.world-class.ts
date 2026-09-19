import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const squadLeader = {
  id: "01a0657e-025e-76ce-8eec-11bcc18f2ff9",
  type: "page-type/world-class",
  slug: "squad-leader",
  title: "Squad Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
