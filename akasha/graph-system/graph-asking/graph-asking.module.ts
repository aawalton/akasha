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
      statement: "An import edge stands only where the index answers one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module a page type names as its loader is reached from every page of that type.",
    },
    {
      invariantKind: "absence",
      statement: "The folder an index stands in is spelled by the indexes rather than here.",
    },
  ],
} as const satisfies Module
