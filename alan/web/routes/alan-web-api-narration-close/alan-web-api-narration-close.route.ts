import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationClose = {
  id: "01a10dc9-9fed-7f95-883f-70b74761f92d",
  type: "page-type/route",
  slug: "alan-web-api-narration-close",
  definition: "how a person ends a narration",
  code: "ts",
  urlPath: "api/narration/:id",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and closes nothing.",
    },
  ],
  createdAt: "2026-10-05T20:37:59.917Z",
  updatedAt: "2026-10-30T16:59:03.968Z",
} as const satisfies Route
