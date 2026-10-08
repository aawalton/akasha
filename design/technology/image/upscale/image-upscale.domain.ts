import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imageUpscale = {
  id: "01a0de71-31d3-73cf-8690-6748db9d4468",
  type: "page-type/domain",
  slug: "image-upscale",
  definition: "how a service is used to enlarge a picture",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "SeedVR2 7B is the service that enlarges a picture.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "SeedVR2 through mflux on the MacBook leaves skin looking plastic at desktop size.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An SRPO refine step smooths skin again and drifts the face at wallpaper width.",
    },
  ],
  createdAt: "2026-09-26T15:59:15.411Z",
  updatedAt: "2026-09-26T16:54:14.000Z",
} as const satisfies Domain
