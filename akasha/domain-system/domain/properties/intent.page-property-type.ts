import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Intent = Invariant

export const intent = {
  id: "01a049c8-3ead-7629-a666-114abcd4574a",
  slug: "intent",
  definition: "an invariant that does not hold yet",
  extendsSlug: "invariant",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
