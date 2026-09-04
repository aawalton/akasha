import type { Module } from "@akasha/code-system/module"

export const gatedLanding = {
  id: "01a068a4-60f0-7001-aebb-1a5a0fbc991d",
  pageTypeSlug: "module",
  slug: "gated-landing",
  definition:
    "bodies written and paths taken away in one mechanical landing, answering the sha it reports",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing carrying no change commits nothing and answers no sha.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body of null takes a path away, so one landing carries both what is written and what goes.",
    },
    {
      invariantKind: "departure",
      statement: "A path is named against the root the landing is made in rather than absolutely.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bytes go into the landing in process rather than out to the pages service or a command line.",
    },
  ],
} as const satisfies Module
