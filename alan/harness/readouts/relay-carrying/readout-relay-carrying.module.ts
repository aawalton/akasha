import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const readoutRelayCarrying = {
  id: "01a09223-fc31-7916-b4e3-8b43923da124",
  type: "module",
  slug: "readout-relay-carrying",
  definition: "the readings one run carries, each named by a readout point and the site showing it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pairs carried are handed in rather than read off a page here.",
    },
    {
      invariantKind: "departure",
      statement: "A pair is carried in the order the pairs were handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relay with no secret to carry on throws rather than carrying part of what it was handed.",
    },
    {
      invariantKind: "departure",
      statement: "A point the index answers no page for costs its own carry rather than the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A site that refuses a carry costs that carry rather than the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that lands is said where the run's output goes.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that does not land is said where the run's faults go.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout is asked for once however many pairs are handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends the process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a point or a site of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
  ],
} as const satisfies Module
