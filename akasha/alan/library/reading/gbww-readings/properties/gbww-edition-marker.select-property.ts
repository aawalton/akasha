import type { SelectProperty } from "@akasha/pages-system/select-property"

export const gbwwEditionMarker = {
  id: "01a0659f-93da-7017-ae3f-0e9294f8b40f",
  pageTypeSlug: "select-property",
  slug: "gbww-edition-marker",
  propertySlug: "edition-marker",
  definition: "which editions of the set carry a reading",
  values: ["common", "ed2-only"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading stands in the plan whether or not the edition Alan holds carries it.",
    },
  ],
} as const satisfies SelectProperty

export type GbwwEditionMarker = (typeof gbwwEditionMarker.values)[number]
