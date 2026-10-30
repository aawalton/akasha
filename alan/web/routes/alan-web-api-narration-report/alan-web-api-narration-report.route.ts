import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationReport = {
  id: "01a113f7-9d79-7c8f-ae3b-8d7ed304e922",
  type: "page-type/route",
  slug: "alan-web-api-narration-report",
  definition: "what the player on a phone reports of a narration",
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
  createdAt: "2026-10-07T01:25:57.241Z",
  updatedAt: "2026-10-30T17:00:17.665Z",
} as const satisfies Route
