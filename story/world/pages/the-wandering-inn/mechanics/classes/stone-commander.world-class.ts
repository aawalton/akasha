import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stoneCommander = {
  id: "01a0657e-025f-7c37-8435-533584fae681",
  type: "page-type/world-class",
  slug: "stone-commander",
  title: "Stone Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
