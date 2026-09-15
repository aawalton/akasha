import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keepalive = {
  id: "01a06227-7bc1-7404-94dc-9da2da8daa1c",
  type: "page-type/module",
  slug: "keepalive",
  definition: "a comment sent down a quiet stream so the reader knows it is still there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An emitter fires only after the interval passes with nothing sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Firing arms the next fire.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An emitter that is never stopped fires for the life of the process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stopped emitter is stopped for good.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A caller that opens an emitter closes that emitter on every path the stream can end by.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the frames a stream has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timers are handed in so a test needs no clock.",
    },
  ],
} as const satisfies Module
