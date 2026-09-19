import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const localLandmark = {
  id: "01a0655a-7b7e-7a00-bbeb-8a65b57906ad",
  type: "page-type/world-title",
  slug: "local-landmark",
  title: "Local Landmark",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldTitle
