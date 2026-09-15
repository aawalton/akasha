import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const towerFloors = {
  id: "01a0673e-1000-7003-a544-be7203cd1844",
  type: "file-property",
  slug: "tower-floors",
  propertySlug: "tower-floors",
  definition: "the floors a tower game has been climbed through",
  extensions: ["jsonl"],
  types: "ts",
} as const satisfies FileProperty
