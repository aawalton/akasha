import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutRelayCarrying = {
  id: "01a09223-fc31-7916-b4e3-8b43923da124",
  type: "page-type/module",
  slug: "readout-relay-carrying",
  definition: "the readings a run carries to the sites each readout's page names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readouts carried are those whose pages name what the run serves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout is carried to each site its page names, in the order named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A relay with no secret to carry on throws rather than carrying part of the readouts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout whose sites cannot be read costs its own carries rather than the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site that refuses a carry costs that carry rather than the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that lands is said where the run's output goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that does not land is said where the run's faults go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is asked for once however many readouts are carried.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends the process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a readout or a site of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a reading.",
    },
  ],
} as const satisfies Module
