import type { Module } from "@akasha/code/module"

export const mlxVlmClient = {
  id: "01a0682d-8ef5-7003-ab7a-241d38f5e4c6",
  pageTypeSlug: "module",
  type: "module",
  slug: "mlx-vlm-client",
  definition: "a clip read frame by frame by the MLX vision model against a checklist",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Frames are drawn evenly across the clip.",
    },
    {
      invariantKind: "departure",
      statement: "The first frame and the last frame are among the frames drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A single frame is drawn from the middle of the clip.",
    },
    {
      invariantKind: "departure",
      statement: "Asking for more frames than the clip has answers with every frame the clip has.",
    },
    {
      invariantKind: "departure",
      statement: "A frame reaches the model as a base64 `data:image/png` url.",
    },
    {
      invariantKind: "departure",
      statement: "The checklist is said after every frame rather than before those frames.",
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
