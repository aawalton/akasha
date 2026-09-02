import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperWeaponTrait = TemperCatalogThing

export const temperWeaponTrait = {
  id: "01a05fd1-d442-7175-b5e4-f7ef9e21a36c",
  pageTypeSlug: "page-type",
  slug: "temper-weapon-trait",
  definition: "a property a weapon is worked with",
  pluralSlug: "temper-weapon-traits",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-trait-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
