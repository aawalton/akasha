import { stringify } from "yaml"
import type { ImageFactorySchematic, MachineConfigPatch } from "./schema"

export function emitPatchYaml(patch: MachineConfigPatch): string {
  return stringify(patch)
}

export function emitDocumentsYaml(docs: readonly MachineConfigPatch[]): string {
  return docs.map((doc) => stringify(doc)).join("---\n")
}

export function emitSchematicYaml(schematic: ImageFactorySchematic): string {
  return stringify(schematic)
}
