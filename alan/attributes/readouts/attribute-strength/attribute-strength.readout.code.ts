import { pointsTodayKept } from "akasha/alan/attributes/modules/points/attribute-points.module.code.ts"
import { attributeStrength } from "akasha/alan/attributes/readouts/attribute-strength/attribute-strength.readout.ts"

export function strengthShown(root: string): number | null {
  return pointsTodayKept(root, attributeStrength.attribute)
}
