import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatTyping = {
  id: "01a1700f-9a83-73e2-8739-cf7ebcacb37b",
  type: "page-type/route",
  slug: "alan-web-api-seat-typing",
  definition: "the signed-in person telling a seat's page that person is typing to the seat",
  code: "ts",
  urlPath: "api/seat/typing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heartbeat is refused for a seat the person signed in may not read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heartbeat writes only the entry of the person signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A heartbeat is written beside the seat's page, on the workstation every pod reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A heartbeat counts as a write, so a browser signed in only to look is refused it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A GET answers the person signed in, so a page leaves that person's own typing out.",
    },
  ],
  createdAt: "2026-10-24T22:37:13.218Z",
  updatedAt: "2026-10-24T22:37:13.218Z",
} as const satisfies Route
