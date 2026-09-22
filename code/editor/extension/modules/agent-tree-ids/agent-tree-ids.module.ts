import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentTreeIds = {
  id: "01a064d3-f9f8-7c48-8cd9-1747ef827506",
  type: "page-type/module",
  slug: "agent-tree-ids",
  definition: "the editor's strings for the agent tree's view and commands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command name here opens with the agent tree's view name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view or the commands these names reach.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the container the agent tree sits in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a row of the agent tree.",
    },
  ],
} as const satisfies Module
