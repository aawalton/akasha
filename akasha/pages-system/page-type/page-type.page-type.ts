import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { ExtendsSlug } from "./properties/extends-slug.relation-property.ts"
import type { Mortal } from "./properties/mortal.boolean-property.ts"
import type { PluralSlug } from "./properties/plural-slug.text-property.ts"
import type { Properties } from "./properties/properties.record-property.ts"

export type PageType = Domain & {
  extendsSlug: ExtendsSlug | null
  properties?: Properties
  mortal?: Mortal
  pluralSlug?: PluralSlug
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  pageTypeSlug: "page-type",
  slug: "page-type",
  definition: "the specification for a kind of page",
  partSlugs: [
    "module/page-type-descent",
    "boolean-property/many",
    "boolean-property/mortal",
    "boolean-property/required",
    "boolean-property/uncommitted",
    "record-property/properties",
    "relation-property/extends-slug",
    "relation-property/page-property-slug",
    "text-property/plural-slug",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "extends-slug", required: true, many: false },
    { pagePropertySlug: "properties", required: false, many: true, max: null },
    { pagePropertySlug: "mortal", required: false, many: false },
    { pagePropertySlug: "plural-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "The slug of a page type is singular.",
    },
  ],
} as const satisfies PageType
