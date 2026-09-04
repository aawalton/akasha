import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const authoring = {
  id: "01a0657d-b91d-7000-a1e5-8f2537828ffb",
  pageTypeSlug: "domain",
  slug: "authoring",
  definition: "the books Alan writes with a persona",
  partSlugs: ["page-type/book-record"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book here is built in sessions between Alan and a persona.",
    },
    {
      invariantKind: "departure",
      statement: "What is kept here is kept about a book rather than inside the book.",
    },
    {
      invariantKind: "departure",
      statement: "A book Alan writes is not a book Alan reads.",
    },
    {
      invariantKind: "gap",
      statement: "The books themselves are outside akasha.",
    },
  ],
} as const satisfies Domain
