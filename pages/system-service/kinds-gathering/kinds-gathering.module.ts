import type { Module } from "@akasha/code-system/module"

export const kindsGathering = {
  id: "01a0723b-ed99-778a-8adb-131a72c2cd98",
  pageTypeSlug: "module",
  slug: "kinds-gathering",
  definition:
    "the rows of one page type and of every page type under it, each worked against its own type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is gathered together with every page type extending it.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types those are is read from `page-type-descent`.",
    },
    {
      invariantKind: "departure",
      statement: "A page type under the one named that no page is filed under is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The properties a row is read by are the ones that row's own page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A formula is worked out from that page type's own declarations.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation is read from that page type's own declarations.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose formulas are barred is answered beside the rows.",
    },
    {
      invariantKind: "departure",
      statement: "A row is keyed by its path, so two page types may carry one slug.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation reaching a slug reaches the first row gathered under that slug.",
    },
    {
      invariantKind: "departure",
      statement: "Every calculation is worked out before any formula.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a question or refuses one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here orders, narrows or cuts the rows it gathers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
