import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Audit } from "./properties/audit.module-property-group.ts"
import type { Check } from "./properties/check.module-property-group.ts"
import type { Decision } from "./properties/decision.module-property-group.ts"
import type { Entries } from "./properties/entries.file-property.ts"
import type { Experimental } from "./properties/experimental.boolean-property.types.ts"
import type { RunsOnAudit } from "./properties/runs-on-audit.boolean-property.types.ts"
import type { RunsOnChange } from "./properties/runs-on-change.boolean-property.types.ts"
import type { RunsOnDeploy } from "./properties/runs-on-deploy.boolean-property.types.ts"
import type { RunsOnWorktree } from "./properties/runs-on-worktree.boolean-property.types.ts"

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
