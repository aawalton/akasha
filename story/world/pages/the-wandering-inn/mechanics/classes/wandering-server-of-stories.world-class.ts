import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wanderingServerOfStories = {
  id: "01a0657e-026f-77fd-9134-d4779eca25a1",
  type: "page-type/world-class",
  slug: "wandering-server-of-stories",
  title: "Wandering Server of Stories",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["head-server-of-tales-and-fables"],
  references: "jsonl",
} as const satisfies WorldClass
