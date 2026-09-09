import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { AuthorityKind } from "./properties/person-authority-kind.relation-property.ts"
import type { PersonSlug } from "./properties/person-authority-person.relation-property.ts"
import type { Target } from "./properties/person-authority-target.text-property.ts"

export type PersonAuthority = Page & {
  person: PersonSlug
  authorityKind: AuthorityKind
  target: Target
}

export const personAuthority = {
  id: "01a0541e-d4d2-7426-bc38-f122ec60f7ba",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "person-authority",
  definition: "what a person may cause the system to do",
  pluralSlug: "person-authorities",
  extends: ["page-type/page"],
  parts: [
    "relation-property/person-authority-kind",
    "relation-property/person-authority-person",
    "text-property/person-authority-target",
  ],
  properties: [
    {
      pageProperty: "relation-property/person-authority-person",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/person-authority-kind", required: true, many: false },
    { pageProperty: "text-property/person-authority-target", required: true, many: false },
  ],
} as const satisfies PageType
