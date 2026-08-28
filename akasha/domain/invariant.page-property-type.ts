import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Invariant = readonly Statement[]

export const invariant = {
  id: "01a049cc-1727-7b7f-8b45-e3cde272a380",
  slug: "invariant",
  definition: "what must always be true of a page",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
