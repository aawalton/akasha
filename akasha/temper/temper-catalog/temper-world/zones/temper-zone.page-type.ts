import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { DropsScripts } from "../properties/drops-scripts.boolean-property.ts"
import type { IsDlc } from "../properties/is-dlc.boolean-property.ts"

export type TemperZone = TemperCatalogThing & {
  dropsScripts: DropsScripts
  isDlc: IsDlc
}

export const temperZone = {
  id: "01a05fc4-7a95-7cb3-941e-d82e9f423411",
  pageTypeSlug: "page-type",
  slug: "temper-zone",
  definition: "a region of the game world",
  pluralSlug: "temper-zones",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["boolean-property/drops-scripts", "boolean-property/is-dlc"],
  properties: [
    { pagePropertySlug: "drops-scripts", required: true, many: false },
    { pagePropertySlug: "is-dlc", required: true, many: false },
  ],
} as const satisfies PageType
