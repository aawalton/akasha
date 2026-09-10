import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { ChangeTargetType } from "../../properties/change-target-type.relation-property.types.ts"
import type { ChangeTargetSubtypeParent } from "./properties/change-target-subtype-parent.relation-property.types.ts"

export type ChangeTargetSubtype = Domain & {
  changeTargetType: ChangeTargetType
  parent?: ChangeTargetSubtypeParent
}
