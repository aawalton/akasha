import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const campBartender = {
  id: "01a0657e-1342-78f1-9972-97a21a19a0f9",
  type: "page-type/world-class",
  slug: "camp-bartender",
  title: "Camp Bartender",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
