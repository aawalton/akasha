import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsEn02 = {
  id: "01a06269-2a03-72a9-92ff-fd43809772c0",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-en-02",
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
