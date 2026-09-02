import type { Module } from "@akasha/code-system/module"

export const housingHover = {
  id: "01a06128-d5ce-79e1-bfae-231c44c3e43b",
  pageTypeSlug: "module",
  slug: "housing-hover",
  definition: "what a housing row shows while the pointer is over it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row under the pointer is marked by a backdrop colour rather than by changed text.",
    },
  ],
} as const satisfies Module
