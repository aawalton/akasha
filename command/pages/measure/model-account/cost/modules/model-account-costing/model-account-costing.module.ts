import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountCosting = {
  id: "01a06a8f-0b3b-76b2-91d8-e3e16a811059",
  type: "module",
  slug: "model-account-costing",
  definition: "what the transcripts on this machine have, priced at the api's own list price",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call is counted once however many transcripts have that call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resumed session writes down again the calls made before that session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call is the same call wherever its identifier is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The calls a subagent made are counted with the calls of the seat above that subagent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A model this module has no price for is named rather than counted at nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call moving no token is not counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cache write is priced by the life that write was made for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cache write stating no life is priced as the shorter life.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The window ends at the moment of asking and runs back the days said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The transcripts sit on this machine.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call made on another machine is not counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A price is the api's charge rather than a subscription's cost.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
