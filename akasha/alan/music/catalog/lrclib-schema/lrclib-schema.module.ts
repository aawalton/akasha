import type { Module } from "@akasha/code-system/module"

export const lrclibSchema = {
  id: "01a06262-ff4c-7003-9b41-cc6b930ce9df",
  pageTypeSlug: "module",
  slug: "lrclib-schema",
  definition: "the shape an LRCLIB answer takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An LRCLIB search answers a bare list.",
    },
    {
      invariantKind: "departure",
      statement: "A record LRCLIB says nothing about instrumentality for is not instrumental.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
