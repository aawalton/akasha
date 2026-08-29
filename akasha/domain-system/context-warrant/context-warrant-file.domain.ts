import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFile = {
  id: "01a04db3-d595-7c09-900d-f413fb5f2e0f",
  pageTypeSlug: "domain",
  slug: "context-warrant-file",
  definition: "what a seat must read for the file it has in hand",
  partSlugs: [
    "domain/context-warrant-file-itself",
    "domain/context-warrant-file-domain",
    "domain/context-warrant-file-page-type",
    "domain/context-warrant-file-property",
    "domain/context-warrant-file-property-file",
    "domain/context-warrant-file-import",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file warrants only for the seat changing it, never for one reading it.",
    },
  ],
} as const satisfies Domain
