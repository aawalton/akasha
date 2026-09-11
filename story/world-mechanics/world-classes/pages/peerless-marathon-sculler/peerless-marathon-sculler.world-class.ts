import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const peerlessMarathonSculler = {
  id: "01a0657e-13b6-72f6-817b-2bd36f131e53",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "peerless-marathon-sculler",
  title: "Peerless Marathon Sculler",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["expert-rower"],
  references: "jsonl",
} as const satisfies WorldClass
