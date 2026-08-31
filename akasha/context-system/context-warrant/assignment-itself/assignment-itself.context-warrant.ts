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
      statement: "A seat warrants the assignment it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no assignment warrants none.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants an assignment of what it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating an initiative warrants the domain that initiative names.",
    },
  ],
} as const satisfies ContextWarrant
