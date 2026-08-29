import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Needs = "path" | "file"

export const needs = {
  id: "01a04bc4-7e86-7284-851d-f858c3ef2f69",
  pageTypeSlug: "page-property-type",
  slug: "needs",
  definition: "how much of a changed file a check is handed to judge it",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    "A check needing only the path is not handed the body, so a rename is judged without a read.",
    "Nothing hands a check the tree; what it must know beyond its file, it asks the index.",
  ],
} as const satisfies PagePropertyType
