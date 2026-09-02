import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFx00 = {
  id: "01a06269-2a12-727c-bae3-72f0eaf91c62",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fx-00",
  definition: "one run of the destinations settings strings in French with English fallbacks",
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
