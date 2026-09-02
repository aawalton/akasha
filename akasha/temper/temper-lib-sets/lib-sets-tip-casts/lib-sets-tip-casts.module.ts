import type { Module } from "@akasha/code-system/module"

export const libSetsTipCasts = {
  id: "01a06231-8f1e-7680-a91c-96672a2939c0",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-casts",
  definition: "the narrowings the tooltip code puts on untyped controls and tables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tooltip control is probed for its methods rather than typed.",
    },
  ],
} as const satisfies Module
