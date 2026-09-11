import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bakerOfPresentsGiftedChef = {
  id: "01a0657e-1336-71b8-a745-454dec86643c",
  type: "world-class",
  slug: "baker-of-presents-gifted-chef",
  title: "Baker of Presents, Gifted Chef",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["kind-baker"],
  references: "jsonl",
} as const satisfies WorldClass
