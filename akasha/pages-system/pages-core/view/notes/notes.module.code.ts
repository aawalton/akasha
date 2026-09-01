import type { PropertyDefinition, PropertyType } from "../../page-data/page-data.module.code.ts"

export function isNotesEligible(type: PropertyType): boolean {
  return type === "markdown" || type === "rich-document"
}

export function firstAlphabeticalNotesPropertyId(
  properties: readonly PropertyDefinition[]
): string | undefined {
  const eligible = properties
    .filter((p) => isNotesEligible(p.type))
    .sort((a, b) => a.title.localeCompare(b.title))
  return eligible[0]?.id
}

export function resolveNotesPropertyId(
  notesPropertyConfig: string | undefined,
  properties: readonly PropertyDefinition[]
): string | undefined {
  if (typeof notesPropertyConfig === "string" && notesPropertyConfig.length > 0) {
    const configured = properties.find(
      (p) => p.id === notesPropertyConfig && isNotesEligible(p.type)
    )
    if (configured !== undefined) return configured.id
  }
  return firstAlphabeticalNotesPropertyId(properties)
}
