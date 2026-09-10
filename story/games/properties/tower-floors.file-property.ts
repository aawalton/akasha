import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type TowerFloors = "jsonl"

export const towerFloors = {
  id: "01a0673e-1000-7003-a544-be7203cd1844",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "tower-floors",
  propertySlug: "tower-floors",
  definition: "the floors a tower game has been climbed through",
} as const satisfies FileProperty
