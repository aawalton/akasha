import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { ViewDataJSON } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"
import {
  isNotesEligible,
  resolveNotesPropertyId,
} from "akasha/pages/core/view/notes/notes.module.code.ts"
import { useMemo } from "react"

export interface NotesViewProps {
  notesProperty?: PropertyDefinition
  notesPropertyOptions: readonly { id: string; label: string }[]
}

export function useNotesViewProps(
  viewConfig: ViewDataJSON | undefined,
  properties: readonly PropertyDefinition[]
): NotesViewProps {
  const notesPropertyOptions = useMemo(
    () =>
      properties.filter((p) => isNotesEligible(p.type)).map((p) => ({ id: p.id, label: p.title })),
    [properties]
  )
  const notesPropertyId =
    viewConfig?.layout === "notes"
      ? resolveNotesPropertyId(viewConfig?.notes_property, properties)
      : undefined
  return {
    notesProperty:
      notesPropertyId != null ? properties.find((p) => p.id === notesPropertyId) : undefined,
    notesPropertyOptions,
  }
}
