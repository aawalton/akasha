import type { SelectProperty } from "@akasha/pages-system/select-property"

export const equipment = {
  id: "01a0657e-2bbf-71e9-85bc-e347194f49ca",
  pageTypeSlug: "select-property",
  slug: "equipment",
  propertySlug: "equipment",
  definition: "the kit the movement is loaded with",
  values: [
    "bands",
    "barbell",
    "body-only",
    "cable",
    "dumbbell",
    "e-z-curl-bar",
    "exercise-ball",
    "foam-roll",
    "kettlebells",
    "machine",
    "medicine-ball",
    "other",
  ],
} as const satisfies SelectProperty

export type Equipment = (typeof equipment.values)[number]
