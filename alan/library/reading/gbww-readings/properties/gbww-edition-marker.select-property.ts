import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const gbwwEditionMarker = {
  id: "01a0659f-93da-7017-ae3f-0e9294f8b40f",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "gbww-edition-marker",
  propertySlug: "edition-marker",
  definition: "which editions of the set have a reading",
  values: ["common", "ed2-only"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading is in the plan whether or not the edition Alan has carries that reading.",
    },
  ],
} as const satisfies SelectProperty

export type GbwwEditionMarker = (typeof gbwwEditionMarker.values)[number]
