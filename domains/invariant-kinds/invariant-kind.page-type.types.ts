import type { Domain } from "../domain.page-type.types.ts"
import type { InvariantGroup } from "./properties/invariant-group.relation-property.ts"

export type InvariantKind = Domain & {
  invariantGroup: InvariantGroup
}
