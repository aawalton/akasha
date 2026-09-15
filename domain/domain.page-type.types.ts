import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Directives } from "akasha/domain/properties/directives.record-property.types.ts"
import type { Expands } from "akasha/domain/properties/expands.boolean-property.types.ts"
import type { Invariants } from "akasha/domain/properties/invariants.record-property.types.ts"
import type { LinkedAt } from "akasha/domain/properties/linked-at.text-property.types.ts"
import type { OutputDirectory } from "akasha/domain/properties/output-directory.build-folder-property.types.ts"
import type { Parts } from "akasha/domain/properties/parts.relation-property.types.ts"
import type { PluralSlug } from "akasha/domain/properties/plural-slug.text-property.types.ts"
import type { TunnelRoutes } from "akasha/domain/properties/tunnel-routes.code-file-property.types.ts"
import type { TypescriptConfig } from "akasha/domain/properties/typescript-config.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

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
  outputDirectory?: OutputDirectory
}
