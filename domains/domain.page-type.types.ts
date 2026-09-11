import type { TunnelRoutes } from "akasha/code-system/workspace-packages/properties/tunnel-routes.code-file-property.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Directives } from "akasha/domains/properties/directives.record-property.ts"
import type { Expands } from "akasha/domains/properties/expands.boolean-property.types.ts"
import type { Invariants } from "akasha/domains/properties/invariants.record-property.ts"
import type { Parts } from "akasha/domains/properties/parts.relation-property.types.ts"
import type { PluralSlug } from "akasha/domains/properties/plural-slug.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Domain = Page & {
  definition: Definition
  pluralSlug?: PluralSlug
  invariants?: Invariants
  directives?: Directives
  expands?: Expands
  parts?: Parts
  tunnelRoutes?: TunnelRoutes
}
