import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AccessKind } from "./properties/person-access-kind.relation-property.ts"
import type { PersonSlug } from "./properties/person-access-person-slug.relation-property.ts"

export type PersonAccess = Page & {
  personSlug: PersonSlug
  accessKind: AccessKind
}

export const personAccess = {
  id: "01a0541e-d4d1-7bc6-9050-6d8cc130723f",
  pageTypeSlug: "page-type",
  slug: "person-access",
  definition: "what a person may reach in the system",
  pluralSlug: "person-accesses",
  extendsSlug: "page-type/page",
  partSlugs: [
    "relation-property/person-access-kind",
    "relation-property/person-access-person-slug",
  ],
  properties: [
    { pagePropertySlug: "person-access-person-slug", required: true, many: false },
    { pagePropertySlug: "person-access-kind", required: true, many: false },
  ],
} as const satisfies PageType
