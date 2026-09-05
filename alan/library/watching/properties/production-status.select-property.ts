import type { SelectProperty } from "@akasha/pages-system/select-property"

export const productionStatus = {
  id: "01a06599-ee09-700c-bf83-88a35f46a2d3",
  pageTypeSlug: "select-property",
  slug: "production-status",
  propertySlug: "production-status",
  definition: "how far along the making of a show or a film is",
  values: ["ended", "released"],
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "The values are the ones the record holds rather than all the provider answers with.",
    },
  ],
} as const satisfies SelectProperty

export type ProductionStatus = (typeof productionStatus.values)[number]
