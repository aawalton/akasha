import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type PersonAccess = Page

export const personAccess = {
  id: "01a0541e-d4d1-7bc6-9050-6d8cc130723f",
  pageTypeSlug: "page-type",
  slug: "person-access",
  definition: "what a person may reach in the system",
  pluralSlug: "person-accesses",
  extendsSlug: "page-type/page",
} as const satisfies PageType
