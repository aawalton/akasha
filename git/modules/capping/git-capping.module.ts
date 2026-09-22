import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitCapping = {
  id: "01a06893-5354-7000-a08b-3fa0ccdb05c0",
  type: "page-type/module",
  slug: "git-capping",
  definition: "running a git command under a time cap and reading back what it said",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command that will not answer is capped rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command that could not be spawned answers with code -1 and the reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a command reaching the network is capped by the network ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command carrying objects is capped far above a command asking a question.",
    },
  ],
} as const satisfies Module
