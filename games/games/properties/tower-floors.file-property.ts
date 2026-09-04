import type { FileProperty } from "@akasha/pages-system/file-property"

export type TowerFloors = "jsonl"

export const towerFloors = {
  id: "01a0673e-1000-7003-a544-be7203cd1844",
  pageTypeSlug: "file-property",
  slug: "tower-floors",
  propertySlug: "tower-floors",
  definition: "the floors a tower game has been climbed through",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
