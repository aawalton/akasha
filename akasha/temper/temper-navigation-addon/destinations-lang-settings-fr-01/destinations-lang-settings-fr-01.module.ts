import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFr01 = {
  id: "01a06269-2a0e-75d4-93d4-a643ea642a86",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fr-01",
  definition: "one run of the destinations settings strings in French",
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
