import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const comfyUi = {
  id: "01a06810-0b68-7eaa-8bd1-c312063e493d",
  type: "page-type/domain",
  slug: "comfy-ui",
  definition: "what ComfyUI is asked to run",
  parts: ["domain/z-image-turbo", "module/comfy-graph"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model that makes images is a domain whose subject is that one model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The settings a model is loaded and sampled with are code rather than a page property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page has the lessons learned by generating with the model.",
    },
  ],
} as const satisfies Domain
