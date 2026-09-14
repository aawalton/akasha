import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const propertyBadge = {
  id: "01a0620f-82c5-700f-bcd7-80f904364925",
  type: "module",
  slug: "property-badge",
  definition: "the badge one property is shown as, drawn by the page type declaring it",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property no page type above it draws takes the badge beside page-property.",
    },
  ],
} as const satisfies Module
