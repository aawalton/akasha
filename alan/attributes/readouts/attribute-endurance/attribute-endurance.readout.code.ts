import { pointsTodayKept } from "akasha/alan/attributes/modules/points/attribute-points.module.code.ts"
import { attributeEndurance } from "akasha/alan/attributes/readouts/attribute-endurance/attribute-endurance.readout.ts"

export function enduranceShown(root: string): number | null {
  return pointsTodayKept(root, attributeEndurance.attribute)
}
