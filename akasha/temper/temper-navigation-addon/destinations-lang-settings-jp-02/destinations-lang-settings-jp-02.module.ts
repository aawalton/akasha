import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsJp02 = {
  id: "01a06269-2a22-75d0-b2a1-543992df40fe",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-jp-02",
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
