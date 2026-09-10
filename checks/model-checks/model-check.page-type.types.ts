import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AuditRuns } from "./properties/audit-runs.number-property.types.ts"
import type { ChangeRuns } from "./properties/change-runs.number-property.types.ts"
import type { ModelTests } from "./properties/model-tests.relation-property.ts"

export type ModelCheck = Domain & {
  modelTests: ModelTests
  changeRuns: ChangeRuns
  auditRuns: AuditRuns
}
