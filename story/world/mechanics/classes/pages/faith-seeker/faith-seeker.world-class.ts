import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const faithSeeker = {
  id: "01a0657e-01da-70ac-9066-8ca8280892be",
  type: "page-type/world-class",
  slug: "faith-seeker",
  title: "Faith Seeker",
  world: "world/the-wandering-inn",
  aliases: ["faith-seekers"],
  references: "jsonl",
} as const satisfies WorldClass
