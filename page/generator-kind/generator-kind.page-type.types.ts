import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AfterChecks } from "akasha/page/generator-kind/properties/after-checks.boolean-property.types.ts"

export type GeneratorKind = Domain & {
  afterChecks: AfterChecks
}
