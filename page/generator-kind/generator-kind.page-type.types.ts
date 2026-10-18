import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AfterChecks } from "akasha/page/generator-kind/properties/after-checks.boolean-property.types.ts"
import type { EveryChange } from "akasha/page/generator-kind/properties/every-change.boolean-property.types.ts"
import type { Watches } from "akasha/page/generator-kind/properties/watches.text-property.types.ts"

export type GeneratorKind = Domain & {
  afterChecks: AfterChecks
  everyChange?: EveryChange
  watches?: Watches
}
