import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const expertRower = {
  id: "01a0657e-1361-70df-9757-ddd6831e58e3",
  type: "page-type/world-class",
  slug: "expert-rower",
  title: "Expert Rower",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  evolvesToSlugs: ["world-class/peerless-marathon-sculler"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.449Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
