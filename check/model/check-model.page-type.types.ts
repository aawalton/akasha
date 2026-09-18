import type { Experimental } from "akasha/check/code/properties/experimental.boolean-property.types.ts"
import type { AuditRuns } from "akasha/check/model/properties/audit-runs.number-property.types.ts"
import type { ChangeRuns } from "akasha/check/model/properties/change-runs.number-property.types.ts"
import type { ModelTests } from "akasha/check/model/properties/model-tests.relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type CheckModel = Domain & {
  modelTests: ModelTests
  changeRuns: ChangeRuns
  auditRuns: AuditRuns
  experimental?: Experimental
}
