import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const personAccess = {
  id: "01a0541e-d4d1-7bc6-9050-6d8cc130723f",
  type: "page-type/page-type",
  slug: "person-access",
  definition: "what a person may reach in akasha",
  extends: ["page-type/page"],
  parts: [
    "relation-property/person-access-kind",
    "relation-property/person-access-person",
    "relation-property/person-access-serves",
    "text-property/person-access-target",
    "multi-relation-property/person-access-deed",
    "text-property/access-narrow-key",
    "text-property/access-narrow-is",
    "record-property/person-access-narrow",
  ],
  properties: [
    {
      pageProperty: "relation-property/person-access-person",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/person-access-kind", required: true, many: false },
    { pageProperty: "text-property/person-access-target", required: true, many: false },
    { pageProperty: "relation-property/person-access-serves", required: false, many: false },
    {
      pageProperty: "multi-relation-property/person-access-deed",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "record-property/person-access-narrow", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
