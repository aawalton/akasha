import type { ChangeTargetType } from "../../properties/change-target-type.relation-property.types.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.types.ts"

export type ChangeMechanicalFileContent = ChangeMechanical & {
  changeTargetType: ChangeTargetType
}
