import { pointsTodayKept } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { attributeCharisma } from "akasha/alan/attributes/readouts/attribute-charisma/attribute-charisma.readout.ts"

export function charismaShown(root: string): number | null {
  return pointsTodayKept(root, attributeCharisma.attribute)
}
