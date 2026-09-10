import type { ChangeTargetSubtype } from "../../properties/change-target-subtype.relation-property.types.ts"
import type { ChangeTargetType } from "../../properties/change-target-type.relation-property.types.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.types.ts"

export type ChangeMechanicalFolder = ChangeMechanical & {
  changeTargetType: ChangeTargetType
  changeTargetSubtype: ChangeTargetSubtype
}
