import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsZh = {
  id: "01a06269-2a34-7a48-a5be-22ec5b2ffc4b",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-zh",
  definition: "the destinations settings strings in Chinese, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
