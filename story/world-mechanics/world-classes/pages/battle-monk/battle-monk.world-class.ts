import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const battleMonk = {
  id: "01a0657e-133d-72b9-bb46-32802a6ae688",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "battle-monk",
  title: "Battle Monk",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
