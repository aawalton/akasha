import type { Domain } from "../../domains/domain.page-type.ts"

export const temperCatalogHost = {
  id: "01a06084-d41a-7744-abe5-6e332b80d93e",
  pageTypeSlug: "domain",
  slug: "temper-catalog-host",
  definition: "what the catalog addon saved, read back as one summary for each account",
  parts: ["module/saved-variables-reader"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Domain
