import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const sleep = {
  id: "01a06220-ef8c-735b-b8a1-1cb4507d71b0",
  type: "page-type/domain",
  slug: "sleep",
  definition: "Alan's sleep",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "sleep" }],
  parts: [
    "module/sleep-reading",
    "readout/upkeep-sleep",
    "service-workstation/sleep-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sleep is read from the tracking the workstation's checkout carries.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every site showing the sleep is carried the sleep rather than taking the sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shows the sleep Alan's workstation last took.",
    },
  ],
} as const satisfies Domain
