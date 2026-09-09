import type { Module } from "@akasha/code/module"

export const pageNarrow = {
  id: "01a0686e-6807-7003-8fd9-7a76d4681715",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-narrow",
  definition: "a page's keys kept down to the ones a caller asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A narrowing that names no key keeps every key.",
    },
    {
      invariantKind: "departure",
      statement: "A narrowing keeps `slug` whether or not the caller named `slug`.",
    },
    {
      invariantKind: "departure",
      statement:
        "Narrowing answers a new map rather than changing the map that narrowing was given.",
    },
  ],
} as const satisfies Module
