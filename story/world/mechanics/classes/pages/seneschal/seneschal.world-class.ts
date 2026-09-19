import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seneschal = {
  id: "01a0657e-024c-73ca-8577-bc6e124da873",
  type: "page-type/world-class",
  slug: "seneschal",
  title: "Seneschal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
