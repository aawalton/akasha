import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { UespId } from "../properties/uesp-id.number-property.ts"

export type TemperScribingThing = TemperCatalogThing & {
  uespId: UespId
}

export const temperScribingThing = {
  id: "01a05fca-cb8c-73ea-beae-bd4ddb3a41f3",
  pageTypeSlug: "page-type",
  slug: "temper-scribing-thing",
  definition: "anything a scribed skill is written out of",
  pluralSlug: "temper-scribing-things",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["number-property/uesp-id"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "item-id", required: true, many: false },
    { pagePropertySlug: "uesp-id", required: true, many: false },
  ],
} as const satisfies PageType
