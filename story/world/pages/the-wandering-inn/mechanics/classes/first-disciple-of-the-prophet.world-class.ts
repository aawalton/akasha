import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstDiscipleOfTheProphet = {
  id: "01a0657e-01dc-7397-b6ef-fa1a38c92c4b",
  type: "page-type/world-class",
  slug: "first-disciple-of-the-prophet",
  title: "First Disciple of the Prophet",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["warrior-priestess-of-god-s-cloth"],
} as const satisfies WorldClass
