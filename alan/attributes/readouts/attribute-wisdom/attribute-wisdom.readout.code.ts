import { pointsTodayKept } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { attributeWisdom } from "akasha/alan/attributes/readouts/attribute-wisdom/attribute-wisdom.readout.ts"

export function wisdomShown(root: string): number | null {
  return pointsTodayKept(root, attributeWisdom.attribute)
}
