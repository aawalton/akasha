import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const longAnswering = {
  id: "01a0956d-dad6-7000-bca1-cb148c7ff3f1",
  type: "module",
  slug: "long-answering",
  definition: "the run of lines a body too long for one answer hands back, and how far it reached",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run short of the last line answers how far the body reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run reaching the last line answers that the body was read whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record naming another body answers nothing already reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body no line of which fits the room left over answers a refusal, not a run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The room left over for a body is never less than nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the record of the bodies an agent read.",
    },
  ],
} as const satisfies Module
