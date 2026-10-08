import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const templarOfSpeech = {
  id: "01a06586-0a64-78b4-b562-1d9f17c19c91",
  type: "page-type/world-class",
  slug: "templar-of-speech",
  title: "Templar of Speech",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/templar-of-the-sky"],
  createdAt: "2026-09-03T04:27:58.436Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
