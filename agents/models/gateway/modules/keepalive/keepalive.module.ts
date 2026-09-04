import type { Module } from "@akasha/code-system/module"

export const keepalive = {
  id: "01a06227-7bc1-7404-94dc-9da2da8daa1c",
  pageTypeSlug: "module",
  slug: "keepalive",
  definition: "a comment sent down a quiet stream so the reader knows it is still there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An emitter fires only after the interval passes with nothing sent.",
    },
    {
      invariantKind: "departure",
      statement: "Firing arms the next fire.",
    },
    {
      invariantKind: "departure",
      statement: "An emitter that is never stopped fires for the life of the process.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped emitter is stopped for good.",
    },
    {
      invariantKind: "constraint",
      statement: "Whoever opens an emitter closes it on every path the stream can end by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a stream carries.",
    },
    {
      invariantKind: "departure",
      statement: "The timers are handed in so a test needs no clock.",
    },
  ],
} as const satisfies Module
