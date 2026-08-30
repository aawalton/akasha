import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const fileDomain = {
  id: "01a04f58-a7ee-7000-94ad-769aa16fc838",
  pageTypeSlug: "context-warrant",
  slug: "file-domain",
  definition: "what a seat must read for where the file's page sits",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file warrants the page that names it among its parts.",
    },
  ],
} as const satisfies ContextWarrant
