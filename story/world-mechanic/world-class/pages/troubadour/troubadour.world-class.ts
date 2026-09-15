import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const troubadour = {
  id: "01a0657e-026d-7f3c-b1f4-3e80700a6ee9",
  type: "world-class",
  slug: "troubadour",
  title: "Troubadour",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
