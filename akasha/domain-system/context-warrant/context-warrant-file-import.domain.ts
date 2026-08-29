import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFileImport = {
  id: "01a04dbc-fc2d-7aa2-9cbf-44127b9a2952",
  pageTypeSlug: "domain",
  slug: "context-warrant-file-import",
  definition: "what a seat must read for what the file imports",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A code file warrants the page of every file it imports, never one imported in turn.",
    },
    {
      invariantKind: "departure",
      statement: "The page of an imported code property file is the page whose property it is.",
    },
  ],
} as const satisfies Domain
