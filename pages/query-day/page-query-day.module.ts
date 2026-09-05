import type { Module } from "@akasha/code-system/module"

export const pageQueryDay = {
  id: "01a0686e-6807-7005-9027-bd2e25430a73",
  pageTypeSlug: "module",
  slug: "page-query-day",
  definition: "the type a query argument takes when what it names is one of Alan's tracked days",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The binder that reads this name and the resolver that fills it reach the same declaration.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says how a day is spelled; this module is the name of the type alone.",
    },
  ],
} as const satisfies Module
