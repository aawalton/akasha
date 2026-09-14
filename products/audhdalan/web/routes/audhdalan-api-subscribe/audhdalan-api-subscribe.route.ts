import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const audhdalanApiSubscribe = {
  id: "01a08289-7b12-7814-8155-5442b3a1236b",
  type: "route",
  slug: "audhdalan-api-subscribe",
  definition: "where a reader gives an address to hear more",
  code: "ts",
  urlPath: "api/subscribe",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Nothing renders an `audhdalan-subscriber` page's body out of the fields the form gives.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An address a reader gives is kept as a subscriber page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A route that cannot keep the address a reader gave answers 503 rather than 500.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address well formed and unkept is told apart from an address refused.",
    },
  ],
} as const satisfies Route
