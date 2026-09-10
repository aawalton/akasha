import type { Page } from "../pages/page.page-type.types.ts"
import type { Definition } from "./properties/definition.standard-agent-english-property.ts"
import type { Directives } from "./properties/directives.record-property.ts"
import type { Expands } from "./properties/expands.boolean-property.ts"
import type { Invariants } from "./properties/invariants.record-property.ts"
import type { Parts } from "./properties/parts.relation-property.ts"
import type { PluralSlug } from "./properties/plural-slug.text-property.ts"

export type Domain = Page & {
  definition: Definition
  pluralSlug?: PluralSlug
  invariants?: Invariants
  directives?: Directives
  expands?: Expands
  parts?: Parts
}
