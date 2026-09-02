import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsEn00 = {
  id: "01a06269-2a01-7238-9e0a-c6339698f974",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-en-00",
  definition: "one run of the destinations settings strings in English",
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
