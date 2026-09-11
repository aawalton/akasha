import type { LinkedAt } from "akasha/code-system/workspace-packages/properties/linked-at.text-property.types.ts"
import type { TunnelRoutes } from "akasha/code-system/workspace-packages/properties/tunnel-routes.code-file-property.types.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Directives } from "akasha/domains/properties/directives.record-property.types.ts"
import type { Expands } from "akasha/domains/properties/expands.boolean-property.types.ts"
import type { Invariants } from "akasha/domains/properties/invariants.record-property.types.ts"
import type { Parts } from "akasha/domains/properties/parts.relation-property.types.ts"
import type { PluralSlug } from "akasha/domains/properties/plural-slug.text-property.types.ts"
import type { TypescriptConfig } from "akasha/domains/properties/typescript-config.file-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Domain = Page & {
  definition: Definition
  pluralSlug?: PluralSlug
  invariants?: Invariants
  directives?: Directives
  expands?: Expands
  parts?: Parts
  tunnelRoutes?: TunnelRoutes
  typescriptConfig?: TypescriptConfig
  linkedAt?: LinkedAt
}
