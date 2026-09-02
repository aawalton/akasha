import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { AlchemyEffects } from "../properties/alchemy-effects.text-property.ts"

export type TemperReagent = TemperCatalogThing & {
  alchemyEffects: AlchemyEffects
}

export const temperReagent = {
  id: "01a05fd1-d440-7e50-9ee1-512f735a1900",
  pageTypeSlug: "page-type",
  slug: "temper-reagent",
  definition: "a plant or part brewed into a drink",
  pluralSlug: "temper-reagents",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["text-property/alchemy-effects"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "item-id", required: true, many: false },
    { pagePropertySlug: "alchemy-effects", required: true, many: true, max: null },
  ],
} as const satisfies PageType
