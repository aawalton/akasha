import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriorsOfHonor = {
  id: "01a0657e-0270-7026-bf27-7d217c17eabc",
  type: "page-type/world-class",
  slug: "warriors-of-honor",
  title: "Warriors of Honor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
