import type { WorldClass } from "../../world-class.page-type.ts"

export const superheroes = {
  id: "01a06586-0a5f-76ef-ad09-ba15424a45cf",
  pageTypeSlug: "world-class",
  slug: "superheroes",
  title: "Superheroes",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
