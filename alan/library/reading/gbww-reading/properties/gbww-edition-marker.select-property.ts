import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const gbwwEditionMarker = {
  id: "01a0659f-93da-7017-ae3f-0e9294f8b40f",
  type: "page-type/select-property",
  slug: "gbww-edition-marker",
  propertySlug: "edition-marker",
  definition: "which editions of the set have a reading",
  values: ["common", "ed2-only"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading is in the plan whether or not the edition Alan has carries that reading.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
