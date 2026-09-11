import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const gladiator = {
  id: "01a0657e-01e2-7394-81bc-e1bbc7359226",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "gladiator",
  title: "Gladiator",
  world: "the-wandering-inn",
  aliases: ["gladiators"],
  references: "jsonl",
} as const satisfies WorldClass
