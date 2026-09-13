import { DO_NOT_EDIT } from "akasha/temper/addon-generators/modules/do-not-edit/do-not-edit.module.code.ts"
import { classes } from "akasha/temper/classes/modules/character-class/character-class.module.code.ts"

const NO_CLASS = "no-class"

export function generateClassMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of classes.ids.entries()) {
    const cls = classes.data[id]
    if (cls === undefined) continue
    if (cls.esoClassId === 0) continue
    indexEntries.push(`  [${cls.esoClassId}]: ${i}, // ${cls.name}`)
    temperIdEntries.push(`  [${cls.esoClassId}]: "${cls.id}", // ${cls.name}`)
  }

  const noClassIndex = classes.ids.indexOf(NO_CLASS)
  if (noClassIndex === -1) {
    throw new Error(
      `generateClassMappings: the classes state no \`${NO_CLASS}\`, so a class id the game adds ` +
        `would fall back to a real class's own index`
    )
  }

  return `\
/**
 * Character Class Mappings (Generated)
 *
 * Maps ESO class IDs to temper indices and string IDs.
 * Source: engine/character/classes-data.ts
 *
 * ${DO_NOT_EDIT}
 */

export const CLASS_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const CLASS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

const NO_CLASS_INDEX = ${noClassIndex}

export function getClassIndex(esoClassId: number): number {
  return CLASS_ESO_ID_TO_INDEX[esoClassId] ?? NO_CLASS_INDEX
}

export function getClassTemperId(esoClassId: number): string {
  return CLASS_ESO_ID_TO_TEMPER_ID[esoClassId] ?? "no-class"
}
`
}
