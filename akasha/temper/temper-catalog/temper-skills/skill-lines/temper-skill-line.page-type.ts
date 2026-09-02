import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoSkillLineId } from "../properties/eso-skill-line-id.number-property.ts"
import type { MaxRank } from "../properties/max-rank.number-property.ts"
import type { SkillLineClass } from "../properties/skill-line-class.text-property.ts"

export type TemperSkillLine = TemperCatalogThing & {
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  class?: SkillLineClass
}

export const temperSkillLine = {
  id: "01a05fca-cb8b-7189-8133-38b9f311342c",
  pageTypeSlug: "page-type",
  slug: "temper-skill-line",
  definition: "a track of skills a character raises together",
  pluralSlug: "temper-skill-lines",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: [
    "number-property/eso-skill-line-id",
    "number-property/max-rank",
    "text-property/skill-line-class",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-skill-line-id", required: true, many: false },
    { pagePropertySlug: "max-rank", required: true, many: false },
    { pagePropertySlug: "subcategory-id", required: true, many: false },
    { pagePropertySlug: "skill-line-class", required: false, many: false },
  ],
} as const satisfies PageType
