import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJf02 = {
  id: "01a06269-2a1c-7b8f-bf3c-64e36b6c2e79",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jf-02",
  definition: "one run of the destinations settings strings in Japanese with English fallbacks",
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
