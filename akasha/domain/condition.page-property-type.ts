import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Condition = Invariant

export const condition = {
  id: "01a049c8-3ead-7eb7-8acd-99d8f7acb304",
  slug: "condition",
  definition: "an invariant that holds only while it is kept true",
  extendsSlug: "invariant",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
