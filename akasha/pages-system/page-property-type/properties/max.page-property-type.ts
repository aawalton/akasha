import type { PagePropertyType } from "../page-property-type.page-type.ts"

export type Max = number

export const max = {
  id: "01a049b9-856c-7599-ab4a-e644848ad626",
  pageTypeSlug: "page-property-type",
  slug: "max",
  definition: "the most a value may run to, in characters or entries",
  extendsSlug: null,
  kind: "number",
  max: null,
} as const satisfies PagePropertyType
