import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { CooldownSeconds } from "akasha/infrastructure/services/properties/cooldown-seconds.number-property.types.ts"
import type { DeployedCommit } from "akasha/infrastructure/services/properties/deployed-commit.text-property.types.ts"
import type { DeploysAfter } from "akasha/infrastructure/services/properties/deploys-after.relation-property.types.ts"
import type { RefusedCommit } from "akasha/infrastructure/services/properties/refused-commit.text-property.types.ts"

export type Service = Domain & {
  deployedCommit?: DeployedCommit
  refusedCommit?: RefusedCommit
  cooldownSeconds?: CooldownSeconds
  deploysAfter?: DeploysAfter
}
