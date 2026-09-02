import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJp01 = {
  id: "01a06269-2a21-7e39-a57e-bae183cd3a5a",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jp-01",
  definition: "one run of the destinations settings strings in Japanese",
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
