import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const onionNinjas = {
  id: "01a0657e-13b3-7e4a-b9a8-6072c236a06b",
  type: "page-type/world-class",
  slug: "onion-ninjas",
  title: "Onion Ninjas",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
