import type { Domain } from "../../../domains/domain.page-type.ts"
import type { ChangeTargetType } from "../../properties/change-target-type.relation-property.ts"
import type { ChangeTargetSubtypeParent } from "./properties/change-target-subtype-parent.relation-property.ts"

export type ChangeTargetSubtype = Domain & {
  changeTargetType: ChangeTargetType
  parent?: ChangeTargetSubtypeParent
}
