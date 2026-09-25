import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const surplus = {
  id: "01a05fc3-145a-7fb1-9715-e7a44e378f74",
  type: "page-type/domain",
  slug: "surplus",
  definition: "how Alan expects today to affect long-term health",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "surplus" }],
  parts: [
    "module/surplus-fall-notifying",
    "module/surplus-fall-readout",
    "module/surplus-fall-ticking",
    "module/surplus-fall-tier",
    "module/surplus-reading",
    "readout/upkeep-surplus",
    "service-workstation/surplus-fall-notifier",
    "service-workstation/surplus-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus is read from the tracking the workstation's checkout carries.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every site showing the surplus is carried the surplus rather than taking the surplus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile shows the surplus Alan's workstation last took.",
    },
  ],
} as const satisfies Domain
