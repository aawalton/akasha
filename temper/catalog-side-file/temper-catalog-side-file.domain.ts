import type { Domain } from "../../domains/domain.page-type.ts"

export const temperCatalogSideFile = {
  id: "01a060ce-b8ca-70c9-aff9-a8d013b9d7e5",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-catalog-side-file",
  definition: "what the catalog addon is told to collect again, written where the addon reads it",
  parts: ["module/catalog-side-file", "module/catalog-file-paths"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The addon is told the things to collect again through a file rather than a call.",
    },
    {
      invariantKind: "departure",
      statement: "The file is Lua the addon loads as a table.",
    },
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
