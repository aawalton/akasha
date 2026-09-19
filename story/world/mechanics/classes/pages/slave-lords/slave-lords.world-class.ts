import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveLords = {
  id: "01a0657e-0256-7d87-8c15-dc81621480cb",
  type: "page-type/world-class",
  slug: "slave-lords",
  title: "Slave Lords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
