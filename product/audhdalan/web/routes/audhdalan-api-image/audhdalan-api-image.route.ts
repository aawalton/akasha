import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanApiImage = {
  id: "01a0d8a3-4bd2-7817-841f-5767a51a8523",
  type: "page-type/route",
  slug: "audhdalan-api-image",
  definition: "the bytes of an image page a slide shows",
  code: "ts",
  urlPath: "api/image/:slug",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image no slide shows is answered as not found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reader here is read as a visitor who is not signed in.",
    },
  ],
} as const satisfies Route
