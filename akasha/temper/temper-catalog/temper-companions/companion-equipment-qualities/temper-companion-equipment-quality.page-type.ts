import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing

export const temperCompanionEquipmentQuality = {
  id: "01a05fcd-aed0-75bf-9fe4-d95291c165fb",
  pageTypeSlug: "page-type",
  slug: "temper-companion-equipment-quality",
  definition: "a grade a piece of companion equipment comes at",
  pluralSlug: "temper-companion-equipment-qualities",
  extendsSlug: "page-type/temper-companion-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "available", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
