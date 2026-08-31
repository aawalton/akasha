import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const domainItself = {
  id: "01a0582e-2829-77ab-9ea6-760d61d23933",
  pageTypeSlug: "context-warrant",
  slug: "domain-itself",
  definition: "what a seat must read for the domain it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the domain it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no domain warrants none.",
    },
    {
      invariantKind: "departure",
      statement: "A domain whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants a domain of what it states.",
    },
    {
      invariantKind: "stopgap",
      statement: "The domain a seat answers for is stated under the key `assignmentSlug`.",
    },
  ],
} as const satisfies ContextWarrant
