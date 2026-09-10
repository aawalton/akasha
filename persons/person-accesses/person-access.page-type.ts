import type { PageType } from "@akasha/pages/page-type"

export const personAccess = {
  id: "01a0541e-d4d1-7bc6-9050-6d8cc130723f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "person-access",
  definition: "what a person may reach in the system",
  pluralSlug: "person-accesses",
  extends: ["page-type/page"],
  parts: [
    "relation-property/person-access-kind",
    "relation-property/person-access-person",
    "text-property/person-access-serves",
    "text-property/person-access-target",
  ],
  properties: [
    {
      pageProperty: "relation-property/person-access-person",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/person-access-kind", required: true, many: false },
    { pageProperty: "text-property/person-access-target", required: true, many: false },
    { pageProperty: "text-property/person-access-serves", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
