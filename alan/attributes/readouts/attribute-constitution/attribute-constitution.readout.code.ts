import { pointsTodayKept } from "akasha/alan/attributes/modules/points/attribute-points.module.code.ts"
import { attributeConstitution } from "akasha/alan/attributes/readouts/attribute-constitution/attribute-constitution.readout.ts"

export function constitutionShown(root: string): number | null {
  return pointsTodayKept(root, attributeConstitution.attribute)
}
