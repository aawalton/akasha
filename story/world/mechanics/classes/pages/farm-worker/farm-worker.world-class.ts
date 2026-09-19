import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farmWorker = {
  id: "01a0657e-1361-7dd6-89f1-ec5033fa8356",
  type: "page-type/world-class",
  slug: "farm-worker",
  title: "Farm Worker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
