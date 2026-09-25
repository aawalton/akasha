import {
  type KeptTurn,
  turnStateOf,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import type { WorkingColor } from "akasha/agent/seat/properties/working-color.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type StateStated = { readonly color?: string }

export const work: Work<KeptTurn, WorkingColor> = (page, reach) => {
  const color = reach.target<StateStated>(turnStateOf(page, reach))?.color
  return typeof color === "string" && color !== "" ? color : null
}
