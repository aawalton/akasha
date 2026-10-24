import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatNotice = {
  id: "01a16ffe-1c42-741d-974e-7343d9f61274",
  type: "page-type/route",
  slug: "alan-web-api-seat-notice",
  definition: "where the signed-in person chooses to be told a seat's replies have finished",
  code: "ts",
  urlPath: "api/seat/notice",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is read and written on the page of the person signed in, and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice for a seat not answering to the person signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write the pages service refused is answered 503 rather than as a notice chosen.",
    },
  ],
  createdAt: "2026-10-24T22:18:06.785Z",
  updatedAt: "2026-10-24T22:18:06.785Z",
} as const satisfies Route
