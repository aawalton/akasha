import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeEndurance } from "./attribute-endurance.readout.ts"

export function enduranceShown(root: string): number | null {
  return pointsTodayKept(root, attributeEndurance.attribute)
}
