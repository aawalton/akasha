import type { Route } from "@akasha/code/route"

export const noSuchRoute = {
  id: "01a072dd-d488-7e97-b669-7076f6de9c20",
  pageTypeSlug: "route",
  slug: "no-such-route",
  definition: "that no route answers the address a caller asked for",
  code: "ts",
  test: "ts",
  urlPath: "api/*",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every address under `/api/` no other route answers is answered here.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names the method and the address that was asked for.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A route declaring no action raises the router's own error before any module runs.",
    },
    {
      invariantKind: "departure",
      statement: "Only a route declaring an action can answer that error.",
    },
    {
      invariantKind: "constraint",
      statement: "The router ranks a route rather than taking it in the order the table names.",
    },
    {
      invariantKind: "departure",
      statement: "This route beats the page catch-all and loses to every declared api route.",
    },
    {
      invariantKind: "absence",
      statement: "No wrong address is forwarded to a route of similar name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tests resolve a path against the real route table rather than naming a module.",
    },
  ],
} as const satisfies Route
