import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const contractScribe = {
  id: "01a0657e-134d-7259-8c50-a4c0c8444c80",
  type: "page-type/world-class",
  slug: "contract-scribe",
  title: "Contract Scribe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
