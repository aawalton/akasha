import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const luckyPrince = {
  id: "01a0657e-0221-7fa6-b599-b24e9fe36e84",
  type: "page-type/world-class",
  slug: "lucky-prince",
  title: "Lucky Prince",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
