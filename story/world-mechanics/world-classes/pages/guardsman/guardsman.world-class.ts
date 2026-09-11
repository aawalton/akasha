import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const guardsman = {
  id: "01a0657e-01ed-7631-8a98-bf20ca10276e",
  type: "world-class",
  slug: "guardsman",
  title: "Guardsman",
  world: "the-wandering-inn",
  evolvesToSlugs: ["shield-companion"],
  references: "jsonl",
} as const satisfies WorldClass
