import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { PersonSlug } from "./properties/person-authority-person-slug.relation-property.ts"

export type PersonAuthority = Page & {
  personSlug: PersonSlug
}

export const personAuthority = {
  id: "01a0541e-d4d2-7426-bc38-f122ec60f7ba",
  pageTypeSlug: "page-type",
  slug: "person-authority",
  definition: "what a person may cause the system to do",
  pluralSlug: "person-authorities",
  extendsSlug: "page-type/page",
  partSlugs: ["relation-property/person-authority-person-slug"],
  properties: [{ pagePropertySlug: "person-slug", required: true, many: false }],
} as const satisfies PageType
