import type { Module } from "@akasha/code-system/module"

export const recipientResolverTick = {
  id: "01a0657d-a75e-7005-b58c-0987d7b7e34f",
  pageTypeSlug: "module",
  slug: "recipient-resolver-tick",
  definition: "one run over the armed specs, reviving each absent seat whose inbound work matches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A spec whose work outruns its timeout is abandoned and taken up next tick.",
    },
    {
      invariantKind: "departure",
      statement: "A spec that throws is said aloud.",
    },
    {
      invariantKind: "departure",
      statement: "The specs after a spec that throws are still walked.",
    },
    {
      invariantKind: "departure",
      statement: "An aborted signal ends the run at the next spec boundary.",
    },
  ],
} as const satisfies Module
