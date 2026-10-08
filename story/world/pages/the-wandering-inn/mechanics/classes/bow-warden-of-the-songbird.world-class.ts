import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bowWardenOfTheSongbird = {
  id: "01a0657e-01c0-7088-bbe4-a260c3ec34bd",
  type: "page-type/world-class",
  slug: "bow-warden-of-the-songbird",
  title: "Bow-Warden of the Songbird",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/bird-hunter"],
  evolvesToSlugs: ["world-class/bow-singer-queen-of-the-free-antinium"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.936Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
