import type { PageType } from "../types/page-type.page-type.ts"

export const oneOfProperty = {
  id: "01a062b2-e0ca-7409-b87f-b8122ca96d56",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "one-of-property",
  definition: "a page property with a value one of its members has",
  pluralSlug: "one-of-properties",
  parts: ["relation-property/members"],
  extends: ["page-type/page-property"],
  properties: [
    {
      pageProperty: "relation-property/members",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member names a page property rather than a kind of value.",
    },
    {
      invariantKind: "departure",
      statement: "A member declares its own target rather than the property declaring that member.",
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
      statement: "A property with a member that admits every value refuses nothing.",
    },
  ],
  types: "ts",
} as const satisfies PageType
