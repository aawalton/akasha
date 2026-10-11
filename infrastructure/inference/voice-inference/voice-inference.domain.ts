import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const voiceInference = {
  id: "01a06815-9efd-701e-a4d4-a26f49e97554",
  type: "page-type/domain",
  slug: "voice-inference",
  definition: "the models that make speech from text and text from speech",
  parts: [
    "container-recipe/voice-infer-image",
    "manifest/voice-infer",
    "python-module/voice-infer-server",
    "python-module/voice-models",
    "python-module/voice-hls",
    "python-module/voice-narration",
    "python-module/voice-session",
    "python-module/voice-timing",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Both models are loaded before the workload reports itself healthy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Kokoro speaks once before the workload reports itself healthy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One inference runs at a time however many callers are waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narration holds the lock for one segment at a time rather than for its whole run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each narration feeds one encoder, so its stream has no gap between segments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration's pieces are held on the pod's disk and dropped with the narration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration makes no more audio than a window ahead of the piece last fetched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At most four narrations live at once, and a new one drops the one fetched least lately.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration nobody fetches for thirty minutes is dropped.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The card this package runs on takes int8 weights and not float16 ones.",
    },
  ],
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-10-11T15:04:34.692Z",
} as const satisfies Domain
