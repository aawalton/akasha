import type { Change } from "../change.page-type.types.ts"
import type { Guards } from "./properties/guards.relation-property.ts"

export type ChangeMechanical = Change & {
  guards?: Guards
}
