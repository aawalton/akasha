import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const capacity = {
  id: "01a06230-614e-7825-b4af-dd84fd42f0ce",
  type: "page-type/domain",
  slug: "capacity",
  definition: "the stress Alan can endure on a day",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "capacity" }],
  parts: [
    "computed-property-module/capacity-hours",
    "module/capacity-reading",
    "readout/upkeep-capacity",
    "service-workstation/capacity-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capacity is read from the tracking the workstation's checkout carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The capacity is summed over the stretches of the day rather than read off the day.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every site showing the capacity is carried the capacity rather than taking that capacity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shows the capacity Alan's workstation last took.",
    },
  ],
  createdAt: "2026-09-02T12:55:32.942Z",
  updatedAt: "2026-10-18T13:44:36.965Z",
} as const satisfies Domain
