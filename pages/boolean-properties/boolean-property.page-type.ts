import type { PageType } from "../types/page-type.page-type.types.ts"

export const booleanProperty = {
  id: "01a04dff-9d7d-7fd5-9836-5f16e5cc63d0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "boolean-property",
  definition: "a page property holding true or false",
  pluralSlug: "boolean-properties",
  extends: ["page-type/page-property"],
  types: "ts",
} as const satisfies PageType
