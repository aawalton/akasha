import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seeker = {
  id: "01a0657e-024c-74b3-90dd-585461047d39",
  type: "page-type/world-class",
  slug: "seeker",
  title: "Seeker",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/djinn-s-legacy-seeker"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.076Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
