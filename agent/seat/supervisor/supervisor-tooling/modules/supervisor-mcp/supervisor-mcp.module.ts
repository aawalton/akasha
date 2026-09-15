import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorMcp = {
  id: "01a0687b-aa8a-7000-b99b-66144cf69680",
  type: "page-type/module",
  slug: "supervisor-mcp",
  definition: "the mcp servers an agent is launched with, and the disabled ones cleared away",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dynamic import reaches the browser storage-state export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree holding no playwright boots.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A supervisor whose browser MCP cannot be seeded boots without offering that MCP.",
    },
  ],
} as const satisfies Module
