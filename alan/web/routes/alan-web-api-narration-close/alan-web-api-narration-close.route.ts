import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationClose = {
  id: "01a10dc9-9fed-7f95-883f-70b74761f92d",
  type: "page-type/route",
  slug: "alan-web-api-narration-close",
  definition: "a narration closed on the speech workload",
  code: "ts",
  urlPath: "api/narration/:id",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and closes nothing.",
    },
  ],
} as const satisfies Route
