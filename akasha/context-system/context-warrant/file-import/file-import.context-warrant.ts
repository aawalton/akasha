import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const fileImport = {
  id: "01a04f58-a7ef-7002-942e-14b7c0c71bef",
  pageTypeSlug: "context-warrant",
  slug: "file-import",
  definition: "what a seat must read for what the file imports",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
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
} as const satisfies ContextWarrant
