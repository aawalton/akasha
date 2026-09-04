import type { Command } from "@akasha/command-system/command"

export const inferenceActivate = {
  id: "01a0685e-fd50-7dbf-9d25-99f97c25cd78",
  pageTypeSlug: "command",
  slug: "inference-activate",
  definition: "the command making one pool service the resident the traffic cop serves",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [{ said: "<name>", takes: "the pool service made resident" }],
  helpNotes: [
    "the pool holds one resident at a time, so making one resident evicts the one that was.",
    "a name the cop does not carry is refused naming the pool services there are.",
    "the answer names every service resident once the swap has settled.",
    "a cold load runs to about three minutes, and the call waits for it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One name is made resident.",
    },
    {
      invariantKind: "departure",
      statement: "A name the cop does not carry is refused naming the ones it does.",
    },
    {
      invariantKind: "departure",
      statement: "A service already resident is made resident by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is what is resident rather than what was asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here provisions the service or starts the cop.",
    },
  ],
} as const satisfies Command
