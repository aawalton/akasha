import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchFiles = {
  id: "01a0685f-4ed9-7c80-a890-3fdd317a74d0",
  type: "module",
  slug: "monarch-files",
  definition: "the Monarch pages inside akasha, read from the checkout rather than from a service",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout is read directly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page family is the index's answer for its page type rather than a folder listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A month page sits in a folder of its own with its transactions entry file beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A month is named for the year and month a day falls in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose file states no slug is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no title is titled by its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transaction line is read by the entry shape's own camel keys rather than by property slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A month with no entry file has no transactions rather than failing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sidecar line that is not one JSON object is refused by its line number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Transactions read over a span are sorted by day rather than left in month order.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
