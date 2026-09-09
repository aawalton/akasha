import type { AlanBook } from "../alan-book.page-type.ts"

export const myProjects = {
  id: "01a076df-326f-755b-bb7b-f72b60d566b1",
  pageTypeSlug: "alan-book",
  slug: "my-projects",
  title: "My Projects",
  description:
    "The undertakings in my life that have a scope, a decision to make, or work left to do — the house and its envelope, rooftop solar, the garden and where our food comes from, the vehicles, the insurance and the holdings, the second passport, and the vendors everything else rests on. Each section is one undertaking, and holds what I have settled about it and what is still open.",
  unit: "words",
} as const satisfies AlanBook
