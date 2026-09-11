import type { AuditRuns } from "akasha/checks/model-checks/properties/audit-runs.number-property.types.ts"
import type { ChangeRuns } from "akasha/checks/model-checks/properties/change-runs.number-property.types.ts"
import type { ModelTests } from "akasha/checks/model-checks/properties/model-tests.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ModelCheck = Domain & {
  modelTests: ModelTests
  changeRuns: ChangeRuns
  auditRuns: AuditRuns
}
