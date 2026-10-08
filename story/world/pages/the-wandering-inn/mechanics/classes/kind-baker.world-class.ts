import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kindBaker = {
  id: "01a0657e-1378-7cdd-af6c-714d1ee1de15",
  type: "page-type/world-class",
  slug: "kind-baker",
  title: "Kind Baker",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/baker-of-presents-gifted-chef"],
  createdAt: "2026-09-03T04:19:16.472Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
