import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBadge = {
  id: "01a0a0ee-a089-744e-97de-3252e3e662e7",
  type: "page-type/module",
  slug: "page-badge",
  definition: "the chip a page is shown as, drawn by that page's own page type",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page no page type above it draws takes the chip beside page.",
    },
  ],
} as const satisfies Module
