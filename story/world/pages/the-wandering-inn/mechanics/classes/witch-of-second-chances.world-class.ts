import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witchOfSecondChances = {
  id: "01a06586-0a77-774b-bb8e-c373f1dc4012",
  type: "page-type/world-class",
  slug: "witch-of-second-chances",
  title: "Witch of Second Chances",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["witch"],
  references: "jsonl",
} as const satisfies WorldClass
