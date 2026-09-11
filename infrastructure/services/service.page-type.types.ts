import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { DeployedCommit } from "akasha/infrastructure/services/properties/deployed-commit.text-property.types.ts"

export type Service = Domain & {
  deployedCommit?: DeployedCommit
}
