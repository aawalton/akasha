import type { Module } from "@akasha/code/module"

export const supervisorMcp = {
  id: "01a0687b-aa8a-7000-b99b-66144cf69680",
  pageTypeSlug: "module",
  slug: "supervisor-mcp",
  definition: "the mcp servers an agent is launched with, and the disabled ones cleared away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dynamic import reaches the browser storage-state export.",
    },
    {
      invariantKind: "departure",
      statement: "A tree holding no playwright boots.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor whose browser MCP cannot be seeded boots without offering that MCP.",
    },
  ],
} as const satisfies Module
