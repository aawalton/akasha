import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { EquipmentAvailable } from "./properties/equipment-available.boolean-property.ts"
import type { EquipmentCategory } from "./properties/equipment-category.select-property.ts"
import type { EquipmentConfiguration } from "./properties/equipment-configuration.select-property.ts"
import type { EquipmentLoads } from "./properties/equipment-loads.number-property.ts"
import type { EquipmentNotes } from "./properties/equipment-notes.text-property.ts"
import type { EquipmentSortOrder } from "./properties/equipment-sort-order.number-property.ts"

export type EquipmentItem = Page & {
  title: Title
  category: EquipmentCategory
  configuration: EquipmentConfiguration
  available: EquipmentAvailable
  loads?: readonly EquipmentLoads[]
  notes?: EquipmentNotes
  sortOrder?: EquipmentSortOrder
}

export const equipmentItem = {
  id: "01a06834-ca86-76cb-a54a-6f86a5225afc",
  pageTypeSlug: "page-type",
  slug: "equipment-item",
  definition: "a piece of kit Alan can load a movement with",
  pluralSlug: "equipment-items",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/equipment-available",
    "number-property/equipment-loads",
    "number-property/equipment-sort-order",
    "select-property/equipment-category",
    "select-property/equipment-configuration",
    "text-property/equipment-notes",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/equipment-category", required: true, many: false },
    { pageProperty: "select-property/equipment-configuration", required: true, many: false },
    { pageProperty: "boolean-property/equipment-available", required: true, many: false },
    {
      pageProperty: "number-property/equipment-loads",
      required: false,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "text-property/equipment-notes", required: false, many: false },
    { pageProperty: "number-property/equipment-sort-order", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece of kit Alan owns is its own page.",
    },
    {
      invariantKind: "departure",
      statement: "The kit vocabulary a movement is tagged with is apart from those pages.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan has not bought yet is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan has not bought yet is unavailable.",
    },
  ],
} as const satisfies PageType
