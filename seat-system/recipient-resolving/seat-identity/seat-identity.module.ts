import type { Module } from "@akasha/code/module"

export const seatIdentity = {
  id: "01a0691b-4f64-74ee-829a-1886f2b0a5e5",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-identity",
  definition: "the id a seat name resolves to, from the seat there now or from the history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat still there is answered by akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that has stopped is answered by the history.",
    },
    {
      invariantKind: "departure",
      statement: "A name in an old message still resolves to the seat that had that name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
