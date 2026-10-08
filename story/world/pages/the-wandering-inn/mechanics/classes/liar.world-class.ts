import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const liar = {
  id: "01a0657e-138d-7821-a337-61656e08eacb",
  type: "page-type/world-class",
  slug: "liar",
  title: "Liar",
  world: "world/the-wandering-inn",
  appearanceCount: 17,
  aliases: ["liars"],
  evolvesToSlugs: ["world-class/amazing-liar"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.493Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
