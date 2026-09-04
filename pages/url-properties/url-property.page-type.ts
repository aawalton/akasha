import type { Max } from "../page-properties/properties/max.number-property.ts"
import type { PageProperty } from "../page-types/page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type UrlProperty = PageProperty & {
  max: Max
}

export const urlProperty = {
  id: "01a063de-2c60-7000-97f0-b6451df11654",
  pageTypeSlug: "page-type",
  slug: "url-property",
  definition: "a page property holding a web address",
  pluralSlug: "url-properties",
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "max", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web address carries the scheme the address is reached over.",
    },
    {
      invariantKind: "departure",
      statement: "A web address is followed rather than read.",
    },
  ],
} as const satisfies PageType
