import type { WorldClass } from "../world-class.page-type.ts"

export const templarOfSpeech = {
  id: "01a06586-0a64-78b4-b562-1d9f17c19c91",
  pageTypeSlug: "world-class",
  slug: "templar-of-speech",
  title: "Templar of Speech",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["templar-of-the-sky"],
} as const satisfies WorldClass
