import type { Module } from "@akasha/code-system/module"

export const supervisorClaimedRedeliveryDecide = {
  id: "01a0686d-9d5e-7008-9fde-93e647443261",
  pageTypeSlug: "module",
  slug: "supervisor-claimed-redelivery-decide",
  definition: "which messages a seat claimed and never consumed are released to be delivered again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message claimed since this process started is still in flight and is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A message whose transcript could not be read is left alone rather than released.",
    },
    {
      invariantKind: "departure",
      statement: "A message the seat read for itself is not released.",
    },
    {
      invariantKind: "departure",
      statement: "A message that reached the seat is not released.",
    },
    {
      invariantKind: "departure",
      statement: "Every message skipped is reported with the reason it was skipped for.",
    },
  ],
} as const satisfies Module
