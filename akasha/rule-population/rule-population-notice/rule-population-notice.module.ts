import type { Module } from "../../code-system/modules/module.page-type.ts"

export const rulePopulationNotice = {
  id: "01a0657b-9adc-7001-8c67-b5cda1e5c61b",
  pageTypeSlug: "module",
  slug: "rule-population-notice",
  definition: "the message body naming which rules weighed nothing and over how much of the tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading over zero rules throws rather than handing back a body.",
    },
    {
      invariantKind: "departure",
      statement: "The body names the blind spots the reading was handed.",
    },
  ],
} as const satisfies Module
