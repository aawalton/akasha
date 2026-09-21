import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mechanicRunning = {
  id: "01a0c463-4e89-7883-b6e9-8377856c3e09",
  type: "page-type/module",
  slug: "mechanic-running",
  definition: "reaching a mechanic by its address and running the code beside that mechanic",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic is found by the address it is filed under rather than by a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code beside the mechanic's page is the code that runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code is loaded again once the file beside the page has changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address the index does not hold is refused rather than run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a mechanic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a mechanic answers is read here into one shape, answered or refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic answering a bare value is read as having answered that value.",
    },
  ],
} as const satisfies Module
