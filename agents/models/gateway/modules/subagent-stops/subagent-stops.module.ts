import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentStops = {
  id: "01a09c65-fde7-7b95-ae20-68255ca085d3",
  type: "module",
  slug: "subagent-stops",
  definition:
    "the subagents a gateway holds as stopped, read from the pages beside its seat and followed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A subagent is held where its page names this seat and a stop is written beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent of another seat is held by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent is held by the id the subagent runs under rather than by its whole agent id.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no agent id holds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The set is read whole from the pages at the start.",
    },
    {
      invariantKind: "departure",
      statement:
        "The set is read whole again after a change under a subagent page's folder settles.",
    },
    {
      invariantKind: "departure",
      statement: "The set is read whole again after the index moves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent page whose folder came after the start is followed once the index moves.",
    },
    {
      invariantKind: "departure",
      statement: "Asking whether a subagent is held reads no file.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping the following closes every watcher.",
    },
    {
      invariantKind: "departure",
      statement: "The pages read are handed in so a test needs no index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers a request.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing proves a folder that came after the start is followed, against a folder really watched.",
    },
  ],
} as const satisfies Module
