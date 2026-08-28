import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Principles = readonly Directive[]

export const principles = {
  id: "01a049c9-3a2c-7fb1-b669-33a23413d326",
  slug: "principles",
  definition: "the truths a domain packs tight so they reach many cases",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
