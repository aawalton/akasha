import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const noSuchRoute = {
  id: "01a072dd-d488-7e97-b669-7076f6de9c20",
  type: "page-type/route",
  slug: "no-such-route",
  definition: "that no route answers the address a caller named",
  code: "ts",
  test: "ts",
  urlPath: "api/*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every address under `/api/` no other route answers is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the method and the address that was asked for.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A route declaring no action raises the router's own error before any module runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a route declaring an action can answer that error.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The router ranks a route rather than taking that route in the order the table names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route beats the page catch-all route and loses to every declared api route.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No wrong address is forwarded to a route of similar name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tests resolve a path against the real route table rather than naming a module.",
    },
  ],
} as const satisfies Route
