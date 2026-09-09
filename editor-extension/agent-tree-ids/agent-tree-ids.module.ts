import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeIds = {
  id: "01a064d3-f9f8-7c48-8cd9-1747ef827506",
  pageTypeSlug: "module",
  type: "module",
  slug: "agent-tree-ids",
  definition: "the strings the editor knows the agent tree's view and commands by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      invariantKind: "departure",
      statement: "A command name here opens with the agent tree's view name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view or the commands these names reach.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the container the agent tree sits in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a row of the agent tree.",
    },
  ],
} as const satisfies Module
