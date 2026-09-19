import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artifactMerchant = {
  id: "01a0657e-1331-7c07-8daa-d03a9e8e6393",
  type: "page-type/world-class",
  slug: "artifact-merchant",
  title: "Artifact Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
