import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const fileProperty = {
  id: "01a04f58-a7ef-7000-90c5-261b47c03601",
  pageTypeSlug: "context-warrant",
  slug: "file-property",
  definition: "what a seat must read for the properties the page states",
  code: "ts",
  test: "ts",
  runsOnRead: false,
  runsOnWrite: false,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page warrants the page property type of every property it states.",
    },
    {
      invariantKind: "departure",
      statement: "A page warrants nothing for a property it does not state.",
    },
  ],
} as const satisfies ContextWarrant
