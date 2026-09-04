import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeIds = {
  id: "01a064d3-f9f8-7c48-8cd9-1747ef827506",
  pageTypeSlug: "module",
  slug: "agent-tree-ids",
  definition:
    "the strings the editor knows the agent tree's view and commands by, and the tree's two waits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names here are the names the extension manifest carries.",
    },
    {
      invariantKind: "departure",
      statement: "A command name here opens with the agent tree's view name.",
    },
    {
      invariantKind: "departure",
      statement: "A wait here is counted in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "The agent tree is read again every second while the editor runs.",
    },
    {
      invariantKind: "departure",
      statement: "A seat file changing is waited out before the agent tree is read again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wait after a seat file changes is far shorter than the wait between readings.",
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
