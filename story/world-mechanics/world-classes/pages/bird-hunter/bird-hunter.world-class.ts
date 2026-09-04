import type { WorldClass } from "../../world-class.page-type.ts"

export const birdHunter = {
  id: "01a0657e-133e-72e5-ae7a-10f8cacb49ad",
  pageTypeSlug: "world-class",
  slug: "bird-hunter",
  title: "Bird Hunter",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["bow-warden-of-the-songbird"],
  references: "jsonl",
} as const satisfies WorldClass
