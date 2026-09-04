import type { Module } from "../../code-system/modules/module.page-type.ts"

export const verdictReading = {
  id: "01a05c14-b119-7000-9120-df7558499051",
  pageTypeSlug: "module",
  slug: "verdict-reading",
  definition: "how something stands, with what was covered and what was found",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading names the subject it is of.",
    },
    {
      invariantKind: "absence",
      statement: "A reading never reads as passing or failing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A coverage whose denominator was not worked out says so rather than standing at zero.",
    },
  ],
} as const satisfies Module
