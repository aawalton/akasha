import type { PagePropertyType } from "../page-property-type.page-type.ts"

export type Kind = "text" | "number" | "boolean" | "relation" | "record" | "list" | "file"

export const kind = {
  id: "01a04a08-fcf3-7000-87b0-81cdbc78ccfb",
  pageTypeSlug: "page-property-type",
  slug: "kind",
  definition: "which kind of value a property holds",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
