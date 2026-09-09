import type { Module } from "@akasha/code/module"

export const kindsGathering = {
  id: "01a0723b-ed99-778a-8adb-131a72c2cd98",
  pageTypeSlug: "module",
  type: "module",
  slug: "kinds-gathering",
  definition:
    "the rows of one page type and of every page type under it, each worked against its own type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is gathered together with every page type extending that page type.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types extend a page type is read from `page-type-descent`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type under the page type named that no page is filed under is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The properties a row is read by are the ones that row's own page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation is read from that page type's own declarations.",
    },
    {
      invariantKind: "departure",
      statement: "The loader is handed the path a calculation's code file is at and a reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "That reader answers the text at any path, so an import a calculation takes folds.",
    },
    {
      invariantKind: "departure",
      statement: "The rows a query asked for are not every page a calculation reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A row is keyed by its path.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation reaching a slug reaches the first row gathered under that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no row gathered carries is looked for in the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is named to the index as that page's page type and its slug joined by a slash.",
    },
    {
      invariantKind: "departure",
      statement: "A page reached through the index has its own page type's calculations.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages name a page under one property is read from the relation index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's values are read once however many pages reach into that page type.",
    },
    {
      invariantKind: "departure",
      statement: "No page type is read until a calculation reaches into that page type.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a question or refuses a question.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here orders or narrows or cuts the rows this module gathers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
