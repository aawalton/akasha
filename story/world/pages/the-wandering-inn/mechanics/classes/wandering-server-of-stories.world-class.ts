import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wanderingServerOfStories = {
  id: "01a0657e-026f-77fd-9134-d4779eca25a1",
  type: "page-type/world-class",
  slug: "wandering-server-of-stories",
  title: "Wandering Server of Stories",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/head-server-of-tales-and-fables"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.111Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
