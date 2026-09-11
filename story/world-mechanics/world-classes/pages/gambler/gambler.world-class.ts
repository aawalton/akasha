import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const gambler = {
  id: "01a0657e-1366-7bbb-9807-474fbc5218cd",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "gambler",
  title: "Gambler",
  world: "the-wandering-inn",
  aliases: ["gamblers"],
  references: "jsonl",
} as const satisfies WorldClass
