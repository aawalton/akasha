import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const webItemFacts = {
  id: "01a06151-370f-7640-8a17-8e63877bb9d9",
  pageTypeSlug: "module",
  slug: "web-item-facts",
  definition: "the facts a rule reads, gathered for the web build from the captured holdings",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies Module
