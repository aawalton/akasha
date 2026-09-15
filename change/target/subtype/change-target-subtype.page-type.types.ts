import type { ChangeTargetType } from "akasha/change/properties/change-target-type.relation-property.types.ts"
import type { ChangeTargetSubtypeParent } from "akasha/change/target/subtype/properties/change-target-subtype-parent.relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ChangeTargetSubtype = Domain & {
  changeTargetType: ChangeTargetType
  parent?: ChangeTargetSubtypeParent
}
