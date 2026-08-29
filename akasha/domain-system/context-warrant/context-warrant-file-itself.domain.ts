import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFileItself = {
  id: "01a04db3-d595-715c-9898-bf10df7193b3",
  pageTypeSlug: "domain",
  slug: "context-warrant-file-itself",
  definition: "what a seat must read for the file it changes",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file warrants itself.",
    },
  ],
} as const satisfies Domain
