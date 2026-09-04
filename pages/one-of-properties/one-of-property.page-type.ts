import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { MemberSlugs } from "../page-properties/properties/member-slugs.relation-property.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type OneOfProperty = PageProperty & {
  memberSlugs: MemberSlugs
}

export const oneOfProperty = {
  id: "01a062b2-e0ca-7409-b87f-b8122ca96d56",
  pageTypeSlug: "page-type",
  slug: "one-of-property",
  definition: "a page property holding a value one of its members holds",
  pluralSlug: "one-of-properties",
  partSlugs: ["relation-property/member-slugs"],
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "member-slugs", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member names a page property rather than a kind of value.",
    },
    {
      invariantKind: "departure",
      statement: "A member declares its own target rather than the one of declaring one.",
    },
    {
      invariantKind: "departure",
      statement: "Every member is tried at once rather than in the order the members are named.",
    },
    {
      invariantKind: "departure",
      statement: "Two members reaching one page reach that page once.",
    },
    {
      invariantKind: "departure",
      statement: "A value reaching two pages through two members is refused rather than resolved.",
    },
    {
      invariantKind: "departure",
      statement: "A one of holding a member that admits every value refuses nothing.",
    },
  ],
} as const satisfies PageType
