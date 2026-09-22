import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const safety = {
  id: "01a05f42-92f5-7005-9a61-d2ed59cb2fac",
  type: "page-type/domain",
  slug: "safety",
  definition: "the safety level Alan logs against his own block",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "safety" }],
  parts: [
    "module/safety-reading",
    "readout/upkeep-safety",
    "service-workstation/safety-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The level is read from the tracking the workstation's checkout carries.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every site showing the level is carried the level rather than taking the level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shows the level Alan's workstation last took.",
    },
  ],
} as const satisfies Domain
