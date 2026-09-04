import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const assignmentItself = {
  id: "01a0582e-2829-77ab-9ea6-760d61d23933",
  pageTypeSlug: "context-warrant",
  slug: "assignment-itself",
  definition: "what a seat must read for the assignment it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the assignment the seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no assignment warrants no assignment.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants an assignment of what the seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating an initiative warrants the domain that initiative names.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment is looked up under the page type the assignment is stated under.",
    },
  ],
} as const satisfies ContextWarrant
