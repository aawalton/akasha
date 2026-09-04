import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"
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
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/equipment-available",
    "boolean-property/equipment-item-available",
    "number-property/equipment-item-sort-order",
    "number-property/equipment-loads",
    "number-property/equipment-sort-order",
    "select-property/equipment-category",
    "select-property/equipment-configuration",
    "select-property/equipment-item-category",
    "select-property/equipment-item-configuration",
    "text-property/equipment-item-loads",
    "text-property/equipment-item-notes",
    "text-property/equipment-notes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "equipment-category", required: true, many: false },
    { pagePropertySlug: "equipment-configuration", required: true, many: false },
    { pagePropertySlug: "equipment-available", required: true, many: false },
    { pagePropertySlug: "equipment-loads", required: false, many: true, max: 20 },
    { pagePropertySlug: "equipment-notes", required: false, many: false },
    { pagePropertySlug: "equipment-sort-order", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A piece of kit Alan owns is its own page, apart from the kit vocabulary a movement is tagged with.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan has not bought yet is a page, and says so by being unavailable.",
    },
  ],
} as const satisfies PageType
