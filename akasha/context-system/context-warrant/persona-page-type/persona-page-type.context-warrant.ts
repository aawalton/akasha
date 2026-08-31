import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const personaPageType = {
  id: "01a0582e-2829-7ac3-97b6-30591b0cdbde",
  pageTypeSlug: "context-warrant",
  slug: "persona-page-type",
  definition: "what a seat must read for the type of the persona it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the type of the persona it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat warrants every type that one extends.",
    },
    {
      invariantKind: "departure",
      statement: "What a page answers to its type for is one rule wherever it is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no persona warrants no type.",
    },
    {
      invariantKind: "departure",
      statement: "A persona whose page cannot be found warrants no type.",
    },
  ],
} as const satisfies ContextWarrant
