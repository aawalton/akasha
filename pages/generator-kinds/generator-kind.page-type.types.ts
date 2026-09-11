import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { AfterChecks } from "akasha/pages/generator-kinds/properties/after-checks.boolean-property.types.ts"

export type GeneratorKind = Domain & {
  afterChecks: AfterChecks
}
