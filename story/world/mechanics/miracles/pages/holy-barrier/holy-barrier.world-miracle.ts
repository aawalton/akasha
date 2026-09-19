import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const holyBarrier = {
  id: "01a0655a-7b7c-74cd-ba0e-ba16f862a836",
  type: "page-type/world-miracle",
  slug: "holy-barrier",
  title: "Holy Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldMiracle
