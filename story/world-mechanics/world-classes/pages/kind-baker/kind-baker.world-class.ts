import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const kindBaker = {
  id: "01a0657e-1378-7cdd-af6c-714d1ee1de15",
  type: "world-class",
  slug: "kind-baker",
  title: "Kind Baker",
  world: "the-wandering-inn",
  evolvesToSlugs: ["baker-of-presents-gifted-chef"],
} as const satisfies WorldClass
