import type { Module } from "@akasha/code-system/module"

export const addonMenuCasts = {
  id: "01a06100-0000-7000-8000-000000000001",
  pageTypeSlug: "module",
  slug: "addon-menu-casts",
  definition: "the unchecked conversions from unknown to each typed shape the library handles",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every cast function performs a bare type assertion.",
    },
    {
      invariantKind: "absence",
      statement: "No cast validates the value the cast is handed.",
    },
    {
      invariantKind: "departure",
      statement: "Casts are collected in one module rather than written at each call site.",
    },
  ],
} as const satisfies Module
