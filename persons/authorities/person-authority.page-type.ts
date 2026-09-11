import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

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
  types: "ts",
} as const satisfies PageType
