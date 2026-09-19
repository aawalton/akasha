import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const animalFriend = {
  id: "01a0657e-132c-7a34-a31d-8a3cf1375c94",
  type: "page-type/world-class",
  slug: "animal-friend",
  title: "Animal Friend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
