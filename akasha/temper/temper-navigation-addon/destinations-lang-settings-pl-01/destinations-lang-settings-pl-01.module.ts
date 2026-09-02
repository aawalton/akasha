import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsPl01 = {
  id: "01a06269-2a26-7731-86ca-f01e38150809",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-pl-01",
  definition: "one run of the destinations settings strings in Polish",
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
