import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type DirectiveKind = "rule" | "principle"

export const directiveKind = {
  id: "01a04e1f-cbf6-7619-8cf2-ab2e898f5abe",
  pageTypeSlug: "page-property-type",
  slug: "directive-kind",
  definition: "which sort of directive one entry is",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-type/directive-kind",
} as const satisfies PagePropertyType
