import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJf = {
  id: "01a06269-2a1d-7acc-b2d8-8693ae37d9d1",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jf",
  definition:
    "the destinations settings strings in Japanese with English fallbacks, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
