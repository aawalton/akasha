import type { Module } from "@akasha/code-system/module"

export const libSetsSetTextSetInfoParts = {
  id: "01a06231-8f1f-7c5c-ab56-4aa95a3697c8",
  pageTypeSlug: "module",
  slug: "lib-sets-set-text-set-info-parts",
  definition: "the set's text broken into named parts with their raw data beside each",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each part carries a flag saying whether the part holds content.",
    },
  ],
} as const satisfies Module
