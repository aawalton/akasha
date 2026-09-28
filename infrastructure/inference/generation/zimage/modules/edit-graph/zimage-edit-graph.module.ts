import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zimageEditGraph = {
  id: "01a0e923-bb2b-7486-96a4-d2b4252f8f56",
  type: "page-type/module",
  slug: "zimage-edit-graph",
  definition: "the graph changing an image under an instruction, then re-texturing its skin",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Qwen-Image-Edit-2511 under the 8-step Lightning LoRA makes the edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beyond Reality 3 then redraws the edit at 0.3 denoise at about two megapixels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One ComfyUI run makes the edit and the redraw.",
    },
  ],
} as const satisfies Module
