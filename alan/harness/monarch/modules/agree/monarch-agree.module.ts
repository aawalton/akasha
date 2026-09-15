import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAgree = {
  id: "01a06867-e5ed-703d-b129-e891c8fed291",
  type: "module",
  slug: "monarch-agree",
  definition:
    "the rules' two paths to a neighbourhood weighed against each other over the live history",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bucketed index and a full scan are claimed to give one neighbourhood.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That claim covers every pairing subject the standing rules reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Proposing from history in memory and applying from a database window are claimed to decide alike.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every claim is said as that claim is weighed rather than only at the end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run where any claim fails leaves non-zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows a rule with no counterpart clause reaches are counted and not weighed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A claim that settles the same way every run stands as the module's test rather than here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Every read runs read-only.",
    },
  ],
} as const satisfies Module
