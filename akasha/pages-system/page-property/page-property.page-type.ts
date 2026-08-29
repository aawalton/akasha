import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type PageProperty = Domain

export const pageProperty = {
  id: "01a04dff-9d7d-7459-a8c0-e038dc7714c3",
  pageTypeSlug: "page-type",
  slug: "page-property",
  definition: "one value a page carries",
  extendsSlug: "page-type/domain",
  design: [
    {
      invariantKind: "departure",
      statement: "What shape a property has is the page type it is, never a value it states.",
    },
    {
      invariantKind: "departure",
      statement: "A page property does not extend; only a page type does.",
    },
  ],
} as const satisfies PageType
