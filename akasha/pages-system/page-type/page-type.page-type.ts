import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { ExtendsSlug } from "./properties/extends-slug.page-property-type.ts"

export type PageType = Domain & {
  extendsSlug: ExtendsSlug | null
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  slug: "page-type",
  definition: "the specification for a kind of page",
  extendsSlug: "domain",
  condition: ["The slug of a page type is singular."],
} as const satisfies PageType
