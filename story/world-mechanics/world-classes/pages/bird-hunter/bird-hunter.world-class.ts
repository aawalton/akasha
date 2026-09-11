import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const birdHunter = {
  id: "01a0657e-133e-72e5-ae7a-10f8cacb49ad",
  type: "world-class",
  slug: "bird-hunter",
  title: "Bird Hunter",
  world: "the-wandering-inn",
  evolvesToSlugs: ["bow-warden-of-the-songbird"],
  references: "jsonl",
} as const satisfies WorldClass
