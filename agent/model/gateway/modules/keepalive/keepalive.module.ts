import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keepalive = {
  id: "01a06227-7bc1-7404-94dc-9da2da8daa1c",
  type: "page-type/module",
  slug: "keepalive",
  definition: "the text a model gateway sends to an agent where a model sends no text for a time",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An emitter fires only after the interval passes with nothing sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Firing arms the next fire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An emitter that is never stopped fires for the life of the process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped emitter is stopped for good.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A caller that opens an emitter closes that emitter on every path the stream can end by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the frames a stream has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The timers are handed in so a test needs no clock.",
    },
  ],
} as const satisfies Module
