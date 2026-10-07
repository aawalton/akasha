import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationReport = {
  id: "01a113f7-9d79-7c8f-ae3b-8d7ed304e922",
  type: "page-type/route",
  slug: "alan-web-api-narration-report",
  definition: "what a phone's player says of a narration",
  code: "ts",
  urlPath: "api/narration/:id/report",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report is one line of the web server's log and is kept nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report names its event and holds only short plain values.",
    },
  ],
} as const satisfies Route
