import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBadge = {
  id: "01a0a0ee-a089-744e-97de-3252e3e662e7",
  type: "module",
  slug: "page-badge",
  definition: "the chip one page is shown as, drawn by that page's own page type",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page no page type above it draws takes the chip beside page.",
    },
  ],
} as const satisfies Module
