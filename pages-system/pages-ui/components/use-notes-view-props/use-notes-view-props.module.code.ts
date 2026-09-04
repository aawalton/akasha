import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { isNotesEligible, resolveNotesPropertyId } from "@akasha/pages-core/view/notes"
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
