import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Needs = "path" | "file" | "tree"

export const needs = {
  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1736",
  pageTypeSlug: "page-property-type",
  slug: "needs",
  definition: "how much of a change a check is handed to judge it",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
