import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Act } from "./act.page-property-type.ts"
import type { Aid } from "./aid.page-property-type.ts"
import type { Name } from "./name.page-property-type.ts"
import type { Warrant } from "./warrant.page-property-type.ts"

export type Directive = {
  name: Name
  act: Act
  warrant: Warrant
  aids: readonly [Aid, Aid]
}

export const directive = {
  id: "01a049c9-3a2c-763c-867a-e909667492b0",
  slug: "directive",
  definition: "what a domain tells whoever reads it to do",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
