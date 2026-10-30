import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mcpRegistry = {
  id: "01a0686c-f06b-7009-b6fa-ed9426be09a5",
  type: "page-type/module",
  slug: "mcp-registry",
  definition: "how code reads the mcp servers a seat uses from a page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The servers a seat gets are read from one page rather than written in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where that page sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration that does not read as a server declaration is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path stated against the instructions root is resolved against this checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path stated against the home directory is resolved against this account's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret named for forwarding is read from the environment at launch.",
    },
  ],
  createdAt: "2026-09-03T17:59:25.035Z",
  updatedAt: "2026-10-30T14:37:44.485Z",
} as const satisfies Module
