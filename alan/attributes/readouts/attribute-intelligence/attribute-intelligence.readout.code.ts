import { pointsTodayKept } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { attributeIntelligence } from "akasha/alan/attributes/readouts/attribute-intelligence/attribute-intelligence.readout.ts"

export function intelligenceShown(root: string): number | null {
  return pointsTodayKept(root, attributeIntelligence.attribute)
}
