import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const authoring = {
  id: "01a0657d-b91d-7000-a1e5-8f2537828ffb",
  type: "domain",
  slug: "authoring",
  definition: "the books Alan writes with a persona",
  parts: ["page-type/book-record"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A book here is built in sessions between Alan and a persona.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page kept here is kept about a book rather than inside the book.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A book Alan writes is not a book Alan reads.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The books themselves are outside akasha.",
    },
  ],
} as const satisfies Domain
