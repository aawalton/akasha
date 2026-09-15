import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const fileDomain = {
  id: "01a04f58-a7ee-7000-94ad-769aa16fc838",
  type: "page-type/context-warrant",
  slug: "file-domain",
  definition: "what a seat must read for where the file's page sits",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file warrants the page that names the file among its parts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a file belongs to is composed out of that file's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One reading of the index answers every question a run of this warrant asks.",
    },
  ],
} as const satisfies ContextWarrant
