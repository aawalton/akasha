import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAgree = {
  id: "01a06867-e5ed-703d-b129-e891c8fed291",
  pageTypeSlug: "module",
  slug: "monarch-agree",
  definition:
    "the rules' two paths to a neighbourhood weighed against each other over the live history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bucketed index and a full scan are claimed to give one neighbourhood.",
    },
    {
      invariantKind: "departure",
      statement: "That claim covers every pairing subject the standing rules reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "Proposing from history in memory and applying from a database window are claimed to decide alike.",
    },
    {
      invariantKind: "departure",
      statement: "Every claim is said as that claim is weighed rather than only at the end.",
    },
    {
      invariantKind: "departure",
      statement: "A run where any claim fails leaves non-zero.",
    },
    {
      invariantKind: "departure",
      statement: "Rows a rule with no counterpart clause reaches are counted and not weighed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A claim that settles the same way every run stands as the module's test rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes; every read runs read-only.",
    },
  ],
} as const satisfies Module
