import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const salesAddonEntry = {
  id: "01a060e2-3180-7c1e-a6c8-0d7019081afa",
  pageTypeSlug: "module",
  slug: "sales-addon-entry",
  definition: "what the sales add-on does once the game has loaded that add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The saved variables carry the account name the sales were captured under.",
    },
    {
      invariantKind: "departure",
      statement: "Capture begins once the writer has handed over its saved variables.",
    },
  ],
} as const satisfies Module
