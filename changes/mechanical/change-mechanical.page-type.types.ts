import type { Change } from "akasha/changes/change.page-type.types.ts"
import type { Guards } from "akasha/changes/mechanical/properties/guards.relation-property.types.ts"

export type ChangeMechanical = Change & {
  guards?: Guards
}
