import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drugAddict = {
  id: "01a0657e-1358-70aa-8882-fe673b9fb9c0",
  type: "page-type/world-class",
  slug: "drug-addict",
  title: "Drug Addict",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
