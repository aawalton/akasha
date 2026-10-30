import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const driveLayout = {
  id: "01a0c542-92b0-7b83-b0f5-3eadde71dde9",
  type: "page-type/select-property",
  slug: "drive-layout",
  propertySlug: "drive-layout",
  definition: "the wheels that move a car trim",
  values: ["FWD", "RWD", "AWD", "4WD"],
  types: "ts",
  createdAt: "2026-09-21T18:37:49.616Z",
  updatedAt: "2026-10-30T15:08:49.929Z",
} as const satisfies SelectProperty
