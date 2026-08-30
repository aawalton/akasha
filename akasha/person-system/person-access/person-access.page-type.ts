import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AccessKind } from "./properties/person-access-kind.relation-property.ts"
import type { PersonSlug } from "./properties/person-access-person-slug.relation-property.ts"
import type { Serves } from "./properties/person-access-serves.text-property.ts"
import type { Target } from "./properties/person-access-target.text-property.ts"

export type PersonAccess = Page & {
  personAccessPersonSlug: PersonSlug
  personAccessKind: AccessKind
  personAccessTarget: Target
  personAccessServes?: Serves
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
    "text-property/person-access-serves",
    "text-property/person-access-target",
  ],
  properties: [
    { pagePropertySlug: "person-access-person-slug", required: true, many: false },
    { pagePropertySlug: "person-access-kind", required: true, many: false },
    { pagePropertySlug: "person-access-target", required: true, many: false },
    { pagePropertySlug: "person-access-serves", required: false, many: false },
  ],
} as const satisfies PageType
