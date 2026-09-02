import type { Module } from "@akasha/code-system/module"

export const useCompletionCatalogs = {
  id: "01a06421-f74b-780d-8790-490781880039",
  pageTypeSlug: "module",
  slug: "use-completion-catalogs",
  definition: "the catalogs a completion tab reads its totals from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A catalog changes when the game does rather than while a reader is looking.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog is asked for once a browser session and held in this module.",
    },
    {
      invariantKind: "departure",
      statement: "A navigation inside the app reuses what is held rather than asking again.",
    },
    {
      invariantKind: "constraint",
      statement: "`/ask` is a POST.",
    },
    {
      invariantKind: "constraint",
      statement: "No HTTP cache would have held a catalog.",
    },
    {
      invariantKind: "departure",
      statement: "The row ceiling is well above the largest catalog.",
    },
    {
      invariantKind: "constraint",
      statement: "The largest catalog holds 311 rows.",
    },
    {
      invariantKind: "constraint",
      statement: "The store answers a page's declared keys under both spellings.",
    },
    {
      invariantKind: "constraint",
      statement: "The store stamps an entry with an id the catalog types do not name.",
    },
    {
      invariantKind: "departure",
      statement: "Narrowing a row to the keys named is what makes the assertion true.",
    },
    {
      invariantKind: "departure",
      statement: "Narrowing a row keeps the row small.",
    },
  ],
} as const satisfies Module
