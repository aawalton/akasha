import type { PagePropertyType } from "../page-property-type.page-type.ts"

export type Type = "text" | "number" | "relation" | "record" | "list"

export const type = {
  id: "01a04a08-fcf3-7000-87b0-81cdbc78ccfb",
  pageTypeSlug: "page-property-type",
  slug: "type",
  definition: "which kind of value a property holds",
  extendsSlug: null,
  type: "text",
  max: 10,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
