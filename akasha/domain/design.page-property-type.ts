import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Design = readonly Statement[]

export const design = {
  id: "01a049c8-3ead-7b7f-90cf-8f8bf8bb5436",
  slug: "design",
  definition: "what is true of a domain now",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
