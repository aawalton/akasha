import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { InvariantGroup } from "akasha/domains/invariant-kinds/properties/invariant-group.relation-property.types.ts"

export type InvariantKind = Domain & {
  invariantGroup: InvariantGroup
}
