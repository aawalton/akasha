import type { Module } from "@akasha/code-system/module"

export const seatIdentity = {
  id: "01a0691b-4f64-74ee-829a-1886f2b0a5e5",
  pageTypeSlug: "module",
  slug: "seat-identity",
  definition: "the id a seat name resolves to, from the seat standing or from the history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat still standing is answered by akasha, and a seat that has stopped by the history.",
    },
    {
      invariantKind: "departure",
      statement: "A name in an old message still resolves to whoever held it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
