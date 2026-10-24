import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatRegret = {
  id: "01a16ff7-b672-7cbe-9dd9-7cf24d4bcf07",
  type: "page-type/route",
  slug: "alan-web-api-seat-regret",
  definition: "a message the signed-in person takes back from a seat while the seat replies to it",
  code: "ts",
  urlPath: "api/seat/regret",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the person who sent a message takes it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the seat has not taken yet is withdrawn before anything else is tried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message the seat took and its conversation does not hold yet is refused as taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message is taken back only while it is the latest a person said and the seat works.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message whose reply finished is refused rather than taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is taken back by asking the seat's supervisor for a regret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer waits until the supervisor clears the request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the conversation still holds once the request clears was refused.",
    },
  ],
  createdAt: "2026-10-24T22:11:07.505Z",
  updatedAt: "2026-10-24T23:22:18.683Z",
} as const satisfies Route
