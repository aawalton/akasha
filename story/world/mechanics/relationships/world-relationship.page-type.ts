import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldRelationship = {
  id: "01a0de40-70c2-7927-8d4d-7536e3539d9c",
  type: "page-type/page-type",
  slug: "world-relationship",
  definition: "how close characters have drawn to one another",
  pluralSlug: "relationships",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  parts: [
    "multi-relation-property/relationship-characters",
    "number-property/relationship-points",
    "computed-property/world-relationship-level",
    "page-type/partners-bond",
  ],
  properties: [
    {
      pageProperty: "multi-relation-property/relationship-characters",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/relationship-points", required: false, many: false },
    { pageProperty: "computed-property/world-relationship-level", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
