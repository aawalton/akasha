import type { PagePropertyType } from "../page/page-property-type.page-type.ts"

export type Settled = boolean

export const settled = {
  id: "01a049c8-3ead-75f9-994d-27335b9fd8cf",
  slug: "settled",
  definition: "whether a domain's shape is agreed and closed",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
