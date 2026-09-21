import type { Audit } from "akasha/check/code/properties/audit.module-property-group.ts"
import type { Cache } from "akasha/check/code/properties/cache.file-property.types.ts"
import type { Check } from "akasha/check/code/properties/check.module-property-group.ts"
import type { Decision } from "akasha/check/code/properties/decision.module-property-group.ts"
import type { Experimental } from "akasha/check/code/properties/experimental.boolean-property.types.ts"
import type { RunsOnAudit } from "akasha/check/code/properties/runs-on-audit.boolean-property.types.ts"
import type { RunsOnChange } from "akasha/check/code/properties/runs-on-change.boolean-property.types.ts"
import type { RunsOnDeploy } from "akasha/check/code/properties/runs-on-deploy.boolean-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type CheckCode = Domain & {
  decision?: Decision
  check?: Check
  audit?: Audit
  runsOnChange: RunsOnChange
  runsOnDeploy: RunsOnDeploy
  runsOnAudit: RunsOnAudit
  experimental?: Experimental
  cache?: Cache
}
