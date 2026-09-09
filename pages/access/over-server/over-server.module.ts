import type { Module } from "@akasha/code/module"

export const overServer = {
  id: "01a05bd6-c533-7600-b18c-c96577f03603",
  pageTypeSlug: "module",
  type: "module",
  slug: "over-server",
  definition: "a page write sent to the server rather than run against the store",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write sent to the server runs the exported function the store would have run.",
    },
    {
      invariantKind: "departure",
      statement: "The guards inside that function judge a write from a browser unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The roster a guard reads comes from the route the app answers page types on.",
    },
  ],
} as const satisfies Module
