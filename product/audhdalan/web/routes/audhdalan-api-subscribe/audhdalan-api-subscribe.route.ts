import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanApiSubscribe = {
  id: "01a08289-7b12-7814-8155-5442b3a1236b",
  type: "page-type/route",
  slug: "audhdalan-api-subscribe",
  definition: "where a reader gives an address to hear more",
  code: "ts",
  test: "ts",
  urlPath: "api/subscribe",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address a reader gives is kept as a subscriber page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address already kept is answered as kept, and nothing is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The route's log names neither an address nor the slug made from that address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route that cannot keep the address a reader gave answers 503 rather than 500.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address well formed and unkept is told apart from an address refused.",
    },
  ],
} as const satisfies Route
