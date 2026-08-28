import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Design = Invariant

export const design = {
  id: "01a049c8-3ead-7b7f-90cf-8f8bf8bb5436",
  slug: "design",
  definition: "an invariant that holds now",
  extendsSlug: "invariant",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
