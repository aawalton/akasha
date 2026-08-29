import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Test = "ts"

export const test = {
  id: "01a04a2e-7e3e-7000-acbe-3a33ab105ce0",
  pageTypeSlug: "page-property-type",
  slug: "test",
  definition: "what proves a page's code, held in a file of its own",
  extendsSlug: null,
  kind: "file",
} as const satisfies PagePropertyType
