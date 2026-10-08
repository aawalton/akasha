import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bakerOfPresentsGiftedChef = {
  id: "01a0657e-1336-71b8-a745-454dec86643c",
  type: "page-type/world-class",
  slug: "baker-of-presents-gifted-chef",
  title: "Baker of Presents, Gifted Chef",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/kind-baker"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.406Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
