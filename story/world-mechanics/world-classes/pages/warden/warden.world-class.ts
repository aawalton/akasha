import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const warden = {
  id: "01a0657e-0270-7e44-9c13-194bb3eb17fc",
  type: "world-class",
  slug: "warden",
  title: "Warden",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
