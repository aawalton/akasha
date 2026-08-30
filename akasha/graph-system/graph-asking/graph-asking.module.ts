import type { Module } from "../../code-system/module/module.page-type.ts"

export const graphAsking = {
  id: "01a04ff4-320c-7689-9d79-b3b0caa05ab1",
  pageTypeSlug: "module",
  slug: "graph-asking",
  definition: "what the graph is asked, and where each answer is read from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An edge going out is read from the body, and an edge coming in is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A question is answered by reading, never by walking.",
    },
  ],
} as const satisfies Module
