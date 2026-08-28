import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Intent = readonly Statement[]

export const intent = {
  id: "01a049c8-3ead-7629-a666-114abcd4574a",
  slug: "intent",
  definition: "what should be true of a domain and is not yet",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
