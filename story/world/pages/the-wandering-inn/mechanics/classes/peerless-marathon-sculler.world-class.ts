import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peerlessMarathonSculler = {
  id: "01a0657e-13b6-72f6-817b-2bd36f131e53",
  type: "page-type/world-class",
  slug: "peerless-marathon-sculler",
  title: "Peerless Marathon Sculler",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/expert-rower"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.534Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
