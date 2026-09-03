import type { Module } from "@akasha/code-system/module"

export const mlxVlmClient = {
  id: "01a0682d-8ef5-7003-ab7a-241d38f5e4c6",
  pageTypeSlug: "module",
  slug: "mlx-vlm-client",
  definition: "a clip read frame by frame by the MLX vision model against a checklist",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Frames are drawn evenly across the clip, the first and the last among them.",
    },
    {
      invariantKind: "departure",
      statement: "A single frame is drawn from the middle of the clip.",
    },
    {
      invariantKind: "departure",
      statement: "Asking for more frames than the clip holds answers with all of them.",
    },
    {
      invariantKind: "departure",
      statement: "A frame reaches the model as a base64 `data:image/png` url.",
    },
    {
      invariantKind: "departure",
      statement: "The checklist is said after every frame rather than before them.",
    },
    {
      invariantKind: "departure",
      statement: "The model is asked at temperature zero.",
    },
    {
      invariantKind: "departure",
      statement: "`ffmpeg` missing from the path is said as that rather than as a spawn fault.",
    },
  ],
} as const satisfies Module
