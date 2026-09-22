import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { CooldownSeconds } from "akasha/infrastructure/service/properties/cooldown-seconds.number-property.types.ts"
import type { DeployEndedAt } from "akasha/infrastructure/service/properties/deploy-ended-at.instant-property.types.ts"
import type { DeployRefusal } from "akasha/infrastructure/service/properties/deploy-refusal.text-property.types.ts"
import type { DeployRefusedAt } from "akasha/infrastructure/service/properties/deploy-refused-at.instant-property.types.ts"
import type { DeployedCommit } from "akasha/infrastructure/service/properties/deployed-commit.text-property.types.ts"
import type { DeploysAfter } from "akasha/infrastructure/service/properties/deploys-after.multi-relation-property.types.ts"
import type { RefusedCommit } from "akasha/infrastructure/service/properties/refused-commit.text-property.types.ts"

export type Service = Domain & {
  deployedCommit?: DeployedCommit
  refusedCommit?: RefusedCommit
  cooldownSeconds?: CooldownSeconds
  deploysAfter?: DeploysAfter
  deployEndedAt?: DeployEndedAt
  deployRefusedAt?: DeployRefusedAt
  deployRefusal?: DeployRefusal
}
