import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const criminals = {
  id: "01a0657e-1350-7db1-8f96-7c745f1e7125",
  type: "world-class",
  slug: "criminals",
  title: "Criminals",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
