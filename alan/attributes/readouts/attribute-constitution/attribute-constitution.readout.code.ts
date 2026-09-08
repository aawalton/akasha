import { pointsTodayKept } from "../../points/attribute-points.module.code.ts"
import { attributeConstitution } from "./attribute-constitution.readout.ts"

export function constitutionShown(root: string): number | null {
  return pointsTodayKept(root, attributeConstitution.attributeSlug)
}
