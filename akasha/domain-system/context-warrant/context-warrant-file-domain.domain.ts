import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFileDomain = {
  id: "01a04db3-d595-78ff-8836-1ef3c5f0af24",
  pageTypeSlug: "domain",
  slug: "context-warrant-file-domain",
  definition: "what a seat must read for where the file's page sits",
  design: [
    {
      invariantKind: "departure",
      statement: "A file warrants the page that names it among its parts.",
    },
  ],
} as const satisfies Domain
