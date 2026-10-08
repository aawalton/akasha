import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const birdHunter = {
  id: "01a0657e-133e-72e5-ae7a-10f8cacb49ad",
  type: "page-type/world-class",
  slug: "bird-hunter",
  title: "Bird Hunter",
  world: "world/the-wandering-inn",
  appearanceCount: 31,
  evolvesToSlugs: ["world-class/bow-warden-of-the-songbird"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.414Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
