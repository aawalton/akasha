import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { EquipmentItemAvailable } from "./properties/equipment-item-available.boolean-property.ts"
import type { EquipmentItemCategory } from "./properties/equipment-item-category.select-property.ts"
import type { EquipmentItemConfiguration } from "./properties/equipment-item-configuration.select-property.ts"
import type { EquipmentItemLoads } from "./properties/equipment-item-loads.text-property.ts"
import type { EquipmentItemNotes } from "./properties/equipment-item-notes.text-property.ts"
import type { EquipmentItemSortOrder } from "./properties/equipment-item-sort-order.number-property.ts"

export type EquipmentItem = Page & {
  title: Title
  equipmentItemAvailable: EquipmentItemAvailable
  equipmentItemCategory?: EquipmentItemCategory
  equipmentItemConfiguration?: EquipmentItemConfiguration
  equipmentItemLoads?: EquipmentItemLoads
  equipmentItemSortOrder?: EquipmentItemSortOrder
  equipmentItemNotes?: EquipmentItemNotes
}

export const equipmentItem = {
  id: "01a06834-ca86-76cb-a54a-6f86a5225afc",
  pageTypeSlug: "page-type",
  slug: "equipment-item",
  definition: "a piece of kit Alan can load a movement with",
  pluralSlug: "equipment-items",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/equipment-item-available",
    "number-property/equipment-item-sort-order",
    "select-property/equipment-item-category",
    "select-property/equipment-item-configuration",
    "text-property/equipment-item-loads",
    "text-property/equipment-item-notes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "equipment-item-available", required: true, many: false },
    { pagePropertySlug: "equipment-item-category", required: false, many: false },
    { pagePropertySlug: "equipment-item-configuration", required: false, many: false },
    { pagePropertySlug: "equipment-item-loads", required: false, many: false },
    { pagePropertySlug: "equipment-item-sort-order", required: false, many: false },
    { pagePropertySlug: "equipment-item-notes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A piece of kit Alan owns is its own page, apart from the kit vocabulary a movement is tagged with.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan wants but does not own stands as a page that says so.",
    },
    {
      invariantKind: "departure",
      statement: "The loads a piece can be set to are said as one line rather than as a list.",
    },
  ],
} as const satisfies PageType
