import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AuditRuns } from "./properties/audit-runs.number-property.ts"
import type { ModelTests } from "./properties/model-tests.relation-property.ts"
import type { PatchRuns } from "./properties/patch-runs.number-property.ts"

export type ModelCheck = Domain & {
  modelTests: ModelTests
  patchRuns: PatchRuns
  auditRuns: AuditRuns
}
