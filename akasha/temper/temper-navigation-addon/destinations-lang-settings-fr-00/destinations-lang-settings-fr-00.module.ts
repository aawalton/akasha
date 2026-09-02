import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFr00 = {
  id: "01a06269-2a0d-7f41-b1cc-1f2de3d72aef",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fr-00",
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
