import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Condition = readonly Statement[]

export const condition = {
  id: "01a049c8-3ead-7eb7-8acd-99d8f7acb304",
  slug: "condition",
  definition: "what is true of a domain only while it is kept true",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
