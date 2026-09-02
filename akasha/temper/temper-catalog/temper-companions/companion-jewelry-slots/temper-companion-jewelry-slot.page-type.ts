import type { PageType } from "@akasha/pages-system/page-type"
import type { SlotCategory } from "../temper-companion-things/properties/slot-category.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionJewelrySlot = TemperCompanionThing & {
  slotCategory: SlotCategory
}

export const temperCompanionJewelrySlot = {
  id: "01a05fcd-aecf-75d4-9252-0fa9f6ad750b",
  pageTypeSlug: "page-type",
  slug: "temper-companion-jewelry-slot",
  definition: "a place a companion wears one piece of jewelry",
  pluralSlug: "temper-companion-jewelry-slots",
  extendsSlug: "page-type/temper-companion-thing",
  partSlugs: ["text-property/slot-category"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "equip-type", required: true, many: false },
    { pagePropertySlug: "slot-category", required: true, many: false },
  ],
} as const satisfies PageType
