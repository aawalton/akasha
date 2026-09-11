import type { Audit } from "akasha/checks/code-checks/properties/audit.module-property-group.ts"
import type { Check } from "akasha/checks/code-checks/properties/check.module-property-group.ts"
import type { Decision } from "akasha/checks/code-checks/properties/decision.module-property-group.ts"
import type { Entries } from "akasha/checks/code-checks/properties/entries.file-property.ts"
import type { Experimental } from "akasha/checks/code-checks/properties/experimental.boolean-property.types.ts"
import type { RunsOnAudit } from "akasha/checks/code-checks/properties/runs-on-audit.boolean-property.types.ts"
import type { RunsOnChange } from "akasha/checks/code-checks/properties/runs-on-change.boolean-property.types.ts"
import type { RunsOnDeploy } from "akasha/checks/code-checks/properties/runs-on-deploy.boolean-property.types.ts"
import type { RunsOnWorktree } from "akasha/checks/code-checks/properties/runs-on-worktree.boolean-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type CodeCheck = Domain & {
  decision?: Decision
  check?: Check
  audit?: Audit
  runsOnChange: RunsOnChange
  runsOnWorktree: RunsOnWorktree
  runsOnDeploy: RunsOnDeploy
  runsOnAudit: RunsOnAudit
  entries?: Entries
  experimental?: Experimental
}
