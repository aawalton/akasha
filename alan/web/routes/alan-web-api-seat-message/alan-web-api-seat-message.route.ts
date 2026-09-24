import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatMessage = {
  id: "01a0d493-a7df-70bc-8964-34c002acd32e",
  type: "page-type/route",
  slug: "alan-web-api-seat-message",
  definition: "a message the signed-in person sends a seat from that seat's page",
  code: "ts",
  urlPath: "api/seat/message",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message is sent from the person whose page names the signed-in contributor, by that person's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor no person page names is answered 403 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message becomes an agent message to the seat whose id the request names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message too long for a message page is refused rather than shortened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message attaches images kept already, named by their image pages' slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message attaching an image no page keeps is refused and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message attaching an image may say nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write the pages service refused is answered 503 rather than as a message sent.",
    },
  ],
} as const satisfies Route
