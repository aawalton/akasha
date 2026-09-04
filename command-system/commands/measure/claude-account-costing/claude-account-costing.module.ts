import type { Module } from "@akasha/code-system/module"

export const claudeAccountCosting = {
  id: "01a06a8f-0b3b-76b2-91d8-e3e16a811059",
  pageTypeSlug: "module",
  slug: "claude-account-costing",
  definition: "what the transcripts on this machine hold, priced at the api's own list price",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is counted once however many transcripts carry that call.",
    },
    {
      invariantKind: "departure",
      statement: "A resumed session writes down again the calls made before that session.",
    },
    {
      invariantKind: "departure",
      statement: "A call is the same call wherever its identifier is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The calls a subagent made are counted with the calls of the seat above that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A model this holds no price for is named rather than counted at nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A call moving no token is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A cache write is priced by the life that write was made for.",
    },
    {
      invariantKind: "departure",
      statement: "A cache write stating no life is priced as the shorter one.",
    },
    {
      invariantKind: "departure",
      statement: "The window ends at the moment of asking and runs back the days said.",
    },
    {
      invariantKind: "departure",
      statement: "The transcripts sit on this machine.",
    },
    {
      invariantKind: "departure",
      statement: "A call made on another machine is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A price is what the api charges rather than what a subscription cost.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
