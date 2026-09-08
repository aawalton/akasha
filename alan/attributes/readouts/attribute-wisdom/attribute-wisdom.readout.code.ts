import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeWisdom } from "./attribute-wisdom.readout.ts"

export function wisdomShown(root: string): number | null {
  return pointsTodayKept(root, attributeWisdom.attributeSlug)
}
