import type { Module } from "@akasha/code-system/module"

export const readoutAnswering = {
  id: "01a05e99-b83f-7309-8cbb-19beb1c4e8cd",
  pageTypeSlug: "module",
  slug: "readout-answering",
  definition: "a fetcher answering one canned payload",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The fetcher answers a test rather than a caller.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest names no way in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what was asked for.",
    },
  ],
} as const satisfies Module
