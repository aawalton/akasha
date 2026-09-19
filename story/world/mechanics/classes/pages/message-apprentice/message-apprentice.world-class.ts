import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const messageApprentice = {
  id: "01a0657e-13a2-71d8-92b8-e2265482b509",
  type: "page-type/world-class",
  slug: "message-apprentice",
  title: "Message Apprentice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
