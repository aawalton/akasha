import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeIntelligence } from "./attribute-intelligence.readout.ts"

export function intelligenceShown(root: string): number | null {
  return pointsTodayKept(root, attributeIntelligence.attributeSlug)
}
