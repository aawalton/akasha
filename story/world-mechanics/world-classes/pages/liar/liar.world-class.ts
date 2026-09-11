import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const liar = {
  id: "01a0657e-138d-7821-a337-61656e08eacb",
  type: "world-class",
  slug: "liar",
  title: "Liar",
  world: "the-wandering-inn",
  aliases: ["liars"],
  evolvesToSlugs: ["amazing-liar"],
  references: "jsonl",
} as const satisfies WorldClass
