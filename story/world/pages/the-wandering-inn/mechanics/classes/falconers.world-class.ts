import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const falconers = {
  id: "01a0657e-01da-7b05-9a52-3d65a6d83db1",
  type: "page-type/world-class",
  slug: "falconers",
  title: "Falconers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
