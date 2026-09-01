import type { Module } from "@akasha/code-system/module"

export const labeling = {
  id: "01a05c6f-c7c3-7893-ad78-650f6e3d81c6",
  pageTypeSlug: "module",
  slug: "labeling",
  definition: "an rrule said back as the English a person reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule that cannot be labeled without loss is refused rather than labeled loosely.",
    },
    {
      invariantKind: "departure",
      statement: "A rule anchored at completion says so at the end of its label.",
    },
  ],
} as const satisfies Module
