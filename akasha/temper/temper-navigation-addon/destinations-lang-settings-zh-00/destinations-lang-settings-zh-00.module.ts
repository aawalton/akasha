import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsZh00 = {
  id: "01a06269-2a30-7dc9-99dd-02dd9583dbbe",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-zh-00",
  definition: "one run of the destinations settings strings in Chinese",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
