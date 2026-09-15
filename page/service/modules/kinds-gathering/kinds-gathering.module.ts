import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kindsGathering = {
  id: "01a0723b-ed99-778a-8adb-131a72c2cd98",
  type: "module",
  slug: "kinds-gathering",
  definition:
    "the rows of one page type and of every page type under it, each worked against its own type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is gathered together with every page type extending that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types extend a page type is read from `page-type-descent`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type under the page type named that no page is filed under is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The properties a row is read by are the ones that row's own page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a page type carries is read from the file beside that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with no such file beside it has what it carries worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation is read from that page type's own declarations.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loader is handed the path a calculation's code file is at and a reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That reader answers the text at any path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows a query asked for are not every page a calculation reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A calculation is worked out over the rows named rather than over every row gathered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation reaches every row gathered however few rows are worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is keyed by its path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation reaching a slug reaches the first row gathered under that slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no row gathered carries is looked for in the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page is named to the index as that page's page type and its slug joined by a slash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page reached through the index has its own page type's calculations.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which pages name a page under one property is read from the edge index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type's values are read once however many pages reach into that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One source reads the index through one reader, and holds that reader no longer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page type is read until a calculation reaches into that page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a question or refuses a question.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here orders or narrows or cuts the rows this module gathers.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
