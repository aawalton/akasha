import type { Module } from "@akasha/code/module"

export const gitCapping = {
  id: "01a06893-5354-7000-a08b-3fa0ccdb05c0",
  pageTypeSlug: "module",
  type: "module",
  slug: "git-capping",
  definition: "running one git command under a time cap and reading back what it said",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command that will not answer is capped rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A command that could not be spawned answers with code -1 and the reason.",
    },
    {
      invariantKind: "departure",
      statement: "Only a command reaching the network is capped by the network ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying objects is capped far above a command asking a question.",
    },
  ],
} as const satisfies Module
