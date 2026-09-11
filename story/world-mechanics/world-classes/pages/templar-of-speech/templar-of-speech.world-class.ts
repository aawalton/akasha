import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const templarOfSpeech = {
  id: "01a06586-0a64-78b4-b562-1d9f17c19c91",
  type: "world-class",
  slug: "templar-of-speech",
  title: "Templar of Speech",
  world: "the-wandering-inn",
  evolvesToSlugs: ["templar-of-the-sky"],
} as const satisfies WorldClass
