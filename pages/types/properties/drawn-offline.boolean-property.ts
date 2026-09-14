import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const drawnOffline = {
  id: "01a0a06e-5560-76fc-acd9-668e1cebe18b",
  type: "boolean-property",
  slug: "drawn-offline",
  propertySlug: "drawn-offline",
  definition: "whether the component drawing a page type's pages works with no network",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type saying nothing here is drawn plainly while the network is away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type saying true here is drawn by its own component either way.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
