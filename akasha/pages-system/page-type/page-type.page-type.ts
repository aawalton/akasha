import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { ExtendsSlug } from "./properties/extends-slug.page-property-type.ts"
import type { Mortal } from "./properties/mortal.page-property-type.ts"
import type { Properties } from "./properties/properties.page-property-type.ts"

export type PageType = Domain & {
  extendsSlug: ExtendsSlug | null
  properties?: Properties
  mortal?: Mortal
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  pageTypeSlug: "page-type",
  slug: "page-type",
  definition: "the specification for a kind of page",
  extendsSlug: "page-type/domain",
  properties: [
    { propertySlug: "page-property-type/extends-slug", required: true, many: false },
    { propertySlug: "page-property-type/properties", required: false, many: true },
    { propertySlug: "page-property-type/mortal", required: false, many: false },
  ],
  condition: [
    {
      invariantKind: "upkeep",
      statement: "The slug of a page type is singular.",
    },
  ],
} as const satisfies PageType
