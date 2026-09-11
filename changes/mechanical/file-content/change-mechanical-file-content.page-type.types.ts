import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"
import type { ChangeTargetType } from "akasha/changes/properties/change-target-type.relation-property.types.ts"

export type ChangeMechanicalFileContent = ChangeMechanical & {
  changeTargetType: ChangeTargetType
}
