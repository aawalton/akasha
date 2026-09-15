import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const columnSampling = {
  id: "01a0686b-bfe9-7eea-9240-9c8c57aeb34f",
  type: "module",
  slug: "column-sampling",
  definition: "one sweep of this window's terminals, recorded as an observation and remembered",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep that could not read the seats answers nothing and records nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every column a seat was seen in is remembered before anything is recorded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sweep is recorded against the bound the process reading was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many seat terminals are here and how many sit in a group are recorded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The trigger that started the sweep is recorded with that sweep.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
