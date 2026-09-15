import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { InvariantGroup } from "akasha/domain/invariant-kind/properties/invariant-group.relation-property.types.ts"

export type InvariantKind = Domain & {
  invariantGroup: InvariantGroup
}
