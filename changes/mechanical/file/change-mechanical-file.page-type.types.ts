import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"
import type { ChangeTargetSubtype } from "akasha/changes/properties/change-target-subtype.relation-property.types.ts"
import type { ChangeTargetType } from "akasha/changes/properties/change-target-type.relation-property.types.ts"

export type ChangeMechanicalFile = ChangeMechanical & {
  changeTargetType: ChangeTargetType
  changeTargetSubtype: ChangeTargetSubtype
}
