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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file warrants the page that names the file among its parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a file belongs to is composed out of that file's own name.",
    },
  ],
} as const satisfies ContextWarrant
