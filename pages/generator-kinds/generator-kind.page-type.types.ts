import type { Domain } from "../../domains/domain.page-type.ts"
import type { AfterChecks } from "./properties/after-checks.boolean-property.ts"

export type GeneratorKind = Domain & {
  afterChecks: AfterChecks
}
