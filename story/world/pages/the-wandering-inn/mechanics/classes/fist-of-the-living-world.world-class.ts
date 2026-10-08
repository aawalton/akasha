import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fistOfTheLivingWorld = {
  id: "01a0657e-01dc-7d77-a04f-093a96a3ecfb",
  type: "page-type/world-class",
  slug: "fist-of-the-living-world",
  title: "Fist of the Living World",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/superior-martial-artist"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.964Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
