import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const audhdalanApiSubscribe = {
  id: "01a08289-7b12-7814-8155-5442b3a1236b",
  pageTypeSlug: "route",
  type: "route",
  slug: "audhdalan-api-subscribe",
  definition: "where a reader gives an address to hear more",
  code: "ts",
  urlPath: "api/subscribe",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "Nothing renders an `audhdalan-subscriber` page's body out of the fields the form gives.",
    },
    {
      invariantKind: "gap",
      statement: "An address a reader gives is kept as a subscriber page.",
    },
    {
      invariantKind: "departure",
      statement: "A route that cannot keep what a reader gave answers 503 rather than 500.",
    },
    {
      invariantKind: "departure",
      statement: "An address well formed and unkept is told apart from an address refused.",
    },
  ],
} as const satisfies Route
