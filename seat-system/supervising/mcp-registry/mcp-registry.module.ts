import type { Module } from "@akasha/code-system/module"

export const mcpRegistry = {
  id: "01a0686c-f06b-7009-b6fa-ed9426be09a5",
  pageTypeSlug: "module",
  slug: "mcp-registry",
  definition: "the tool servers a seat is launched with, read off the agent settings page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The servers a seat gets are read from one page rather than written in code.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration that does not read as a server declaration is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path stated against the instructions root is resolved against this checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A path stated against the home directory is resolved against this account's.",
    },
    {
      invariantKind: "departure",
      statement: "A secret named for forwarding is read from the environment at launch.",
    },
  ],
} as const satisfies Module
