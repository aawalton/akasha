import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const inferenceClient = {
  id: "01a0682d-8f07-7000-ab6b-b7ebbf0863a0",
  type: "page-type/domain",
  slug: "inference-client",
  definition: "how code calls a model service",
  parts: [
    "module/ace-step-client",
    "module/comfy-client",
    "module/cop-fetch",
    "module/gemini-image-client",
    "module/inference-output-path",
    "module/inference-seed",
    "module/mlx-image-client",
    "module/mlx-vlm-client",
    "module/riff-bytes",
    "module/segment-client",
    "module/voice-clone-client",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A client speaks one service's own wire shape rather than a shape shared here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A client answers with the bytes the service made rather than a path those bytes were written to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here keeps a record of the run a client asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which host a service is on.",
    },
  ],
  createdAt: "2026-09-03T16:50:11.335Z",
  updatedAt: "2026-09-25T16:34:03.000Z",
} as const satisfies Domain
