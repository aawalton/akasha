import type { Module } from "@akasha/code/module"

export const gatedLanding = {
  id: "01a068a4-60f0-7001-aebb-1a5a0fbc991d",
  pageTypeSlug: "module",
  type: "module",
  slug: "gated-landing",
  definition:
    "bodies written and paths taken away in one mechanical landing, answering the sha it made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing with no change commits nothing and answers no sha.",
    },
    {
      invariantKind: "departure",
      statement: "A body to write goes in through the change adding a file.",
    },
    {
      invariantKind: "departure",
      statement: "A path to take away goes through the change removing a file.",
    },
    {
      invariantKind: "departure",
      statement: "One landing has both the bodies written and the removals.",
    },
    {
      invariantKind: "departure",
      statement: "A path is named against the root the landing is made in rather than absolutely.",
    },
    {
      invariantKind: "departure",
      statement: "The sha is the one the landing answers rather than one read out of a report.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies go into the landing in process rather than out to the pages service or a command line.",
    },
    {
      invariantKind: "gap",
      statement: "The writer an act names is read by nothing.",
    },
  ],
} as const satisfies Module
