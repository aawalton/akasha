import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { PersonSlug } from "./properties/person-access-person-slug.relation-property.ts"

export type PersonAccess = Page & {
  personSlug: PersonSlug
}

export const personAccess = {
  id: "01a0541e-d4d1-7bc6-9050-6d8cc130723f",
  pageTypeSlug: "page-type",
  slug: "person-access",
  definition: "what a person may reach in the system",
  pluralSlug: "person-accesses",
  extendsSlug: "page-type/page",
  partSlugs: ["relation-property/person-access-person-slug"],
  properties: [{ pagePropertySlug: "person-slug", required: true, many: false }],
} as const satisfies PageType
