import type { Module } from "@akasha/code/module"

export const propertyBadge = {
  id: "01a0620f-82c5-700f-bcd7-80f904364925",
  pageTypeSlug: "module",
  type: "module",
  slug: "property-badge",
  definition: "The badge one property is shown as, chosen by that property's type.",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property whose type no badge is registered for is shown as nothing.",
    },
  ],
} as const satisfies Module
