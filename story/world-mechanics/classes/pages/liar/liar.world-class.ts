import type { WorldClass } from "../../world-class.page-type.ts"

export const liar = {
  id: "01a0657e-138d-7821-a337-61656e08eacb",
  pageTypeSlug: "world-class",
  slug: "liar",
  title: "Liar",
  worldSlug: "the-wandering-inn",
  aliases: ["liars"],
  evolvesToSlugs: ["amazing-liar"],
  references: "jsonl",
} as const satisfies WorldClass
