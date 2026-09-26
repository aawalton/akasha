import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageThreading = {
  id: "01a0deef-2ff0-71ad-a61a-ecb0c660f106",
  type: "page-type/module",
  slug: "page-threading",
  definition: "the threads a question or a write arriving over HTTP is answered on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reads are answered on several reading threads at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read goes to the reading thread with the fewest reads waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every write is answered on one writing thread of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write waiting for the hold keeps no read waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question, a read, a shape and a file are reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read answered on a thread is settled apart from every landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream and what a stream follows are answered where the service listens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread runs the code the service was started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread that is lost answers what it held as a fault of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread that is lost is started again in its place.",
    },
  ],
} as const satisfies Module
