import type { Decisions } from "akasha/domain/properties/decisions.record-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Directives } from "akasha/domain/properties/directives.record-property.types.ts"
import type { Expands } from "akasha/domain/properties/expands.boolean-property.types.ts"
import type { LinkedAt } from "akasha/domain/properties/linked-at.text-property.types.ts"
import type { OutputDirectory } from "akasha/domain/properties/output-directory.build-folder-property.types.ts"
import type { Parts } from "akasha/domain/properties/parts.relation-property.types.ts"
import type { TunnelRoutes } from "akasha/domain/properties/tunnel-routes.record-property.types.ts"
import type { TypescriptConfig } from "akasha/domain/properties/typescript-config.file-property.types.ts"
import type { Term } from "akasha/domain/standard-agent-english/term/term.page-type.types.ts"

export type Domain = Term & {
  definition: Definition
  decisions?: Decisions
  directives?: Directives
  expands?: Expands
  parts?: Parts
  typescriptConfig?: TypescriptConfig
  linkedAt?: LinkedAt
  outputDirectory?: OutputDirectory
  tunnelRoutes?: TunnelRoutes
}
