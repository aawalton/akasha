import type { Change } from "akasha/change/change.page-type.types.ts"
import type { Guards } from "akasha/change/mechanical/properties/guards.relation-property.types.ts"

export type ChangeMechanical = Change & {
  guards?: Guards
}
