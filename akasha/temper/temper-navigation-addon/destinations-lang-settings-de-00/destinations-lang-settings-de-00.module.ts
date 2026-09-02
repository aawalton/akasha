import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsDe00 = {
  id: "01a06269-29fb-7e0e-b911-e60ba6d53708",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-de-00",
  definition: "one run of the destinations settings strings in German",
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
