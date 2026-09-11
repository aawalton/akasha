import type { ChangeTargetType } from "akasha/changes/properties/change-target-type.relation-property.types.ts"
import type { ChangeTargetSubtypeParent } from "akasha/changes/targets/subtypes/properties/change-target-subtype-parent.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ChangeTargetSubtype = Domain & {
  changeTargetType: ChangeTargetType
  parent?: ChangeTargetSubtypeParent
}
