import type { Module } from "@akasha/code-system/module"

export const graphAsking = {
  id: "01a04ff4-320c-7689-9d79-b3b0caa05ab1",
  pageTypeSlug: "module",
  slug: "graph-asking",
  definition: "what the graph is asked, and where each answer is read from",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An edge going out is read from the body and an edge coming in is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A question is answered by reading rather than by walking.",
    },
    {
      invariantKind: "departure",
      statement: "An import edge stands only where the index answers an import edge.",
    },
    {
      invariantKind: "departure",
      statement: "The index a question is answered from is named by the caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module a page type names as its loader is reached from every page of that type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page body an answer rests on is read through the index handed in rather than off the working tree.",
    },
    {
      invariantKind: "absence",
      statement: "The folder an index stands in is spelled by the indexes rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "The repository holding the pages is never named here.",
    },
  ],
} as const satisfies Module
