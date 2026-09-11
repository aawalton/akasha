import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const farmWorker = {
  id: "01a0657e-1361-7dd6-89f1-ec5033fa8356",
  type: "world-class",
  slug: "farm-worker",
  title: "Farm Worker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
