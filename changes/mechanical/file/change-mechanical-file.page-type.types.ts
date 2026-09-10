import type { ChangeTargetSubtype } from "../../properties/change-target-subtype.relation-property.ts"
import type { ChangeTargetType } from "../../properties/change-target-type.relation-property.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.types.ts"

export type ChangeMechanicalFile = ChangeMechanical & {
  changeTargetType: ChangeTargetType
  changeTargetSubtype: ChangeTargetSubtype
}
