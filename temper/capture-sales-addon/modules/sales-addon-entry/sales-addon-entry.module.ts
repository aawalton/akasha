import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesAddonEntry = {
  id: "01a060e2-3180-7c1e-a6c8-0d7019081afa",
  type: "page-type/module",
  slug: "sales-addon-entry",
  definition: "what the sales add-on does once the game has loaded that add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables have the account name the sales were captured under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Capture begins once the writer has handed over its saved variables.",
    },
  ],
} as const satisfies Module
