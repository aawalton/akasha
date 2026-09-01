import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const personItself = {
  id: "01a0595f-f1a6-7dc0-bd43-a634801f920a",
  pageTypeSlug: "context-warrant",
  slug: "person-itself",
  definition: "what a seat must read for the person it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the person the seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no person warrants no person.",
    },
    {
      invariantKind: "departure",
      statement: "A person whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants a person.",
    },
    {
      invariantKind: "departure",
      statement:
        "A person is named by its slug wherever the seat states the person under a page type.",
    },
  ],
} as const satisfies ContextWarrant
