import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const voiceInference = {
  id: "01a06815-9efd-701e-a4d4-a26f49e97554",
  type: "page-type/domain",
  slug: "voice-inference",
  definition: "speech turned into text and text turned into speech on one card",
  parts: [
    "container-recipe/voice-infer-image",
    "manifest/voice-infer",
    "python-module/voice-infer-server",
    "python-module/voice-models",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Both models are loaded before the workload reports itself healthy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One inference runs at a time however many callers are waiting.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The card this package runs on takes int8 weights and not float16 ones.",
    },
  ],
} as const satisfies Domain
