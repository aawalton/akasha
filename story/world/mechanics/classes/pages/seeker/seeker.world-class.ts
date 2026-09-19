import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seeker = {
  id: "01a0657e-024c-74b3-90dd-585461047d39",
  type: "page-type/world-class",
  slug: "seeker",
  title: "Seeker",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["djinn-s-legacy-seeker"],
  references: "jsonl",
} as const satisfies WorldClass
