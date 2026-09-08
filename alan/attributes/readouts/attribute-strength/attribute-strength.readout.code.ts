import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeStrength } from "./attribute-strength.readout.ts"

export function strengthShown(root: string): number | null {
  return pointsTodayKept(root, attributeStrength.attributeSlug)
}
