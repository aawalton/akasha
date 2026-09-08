import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeCharisma } from "./attribute-charisma.readout.ts"

export function charismaShown(root: string): number | null {
  return pointsTodayKept(root, attributeCharisma.attributeSlug)
}
