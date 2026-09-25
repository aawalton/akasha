import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const zimage = {
  id: "01a06815-9efd-7032-89aa-a2f0ea5e1881",
  type: "page-type/domain",
  slug: "zimage",
  definition: "how code makes an image from text",
  parts: [
    "container-recipe/zimage-image",
    "module/zimage-explore-batch",
    "module/zimage-explore-worker",
    "module/zimage-graph",
    "module/zimage-models",
    "shell-script/zimage-down",
    "shell-script/zimage-provision",
    "shell-script/zimage-smoke",
    "shell-script/zimage-up",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every checkpoint here loads through the stock nodes rather than a quantised loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt file may pin the seed the render is drawn with.",
    },
  ],
} as const satisfies Domain
