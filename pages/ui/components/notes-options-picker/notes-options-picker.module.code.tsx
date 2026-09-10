"use client"

import { FilterableList, FilterableListItem } from "@akasha/design-primitives/filterable-list"
import { SubView } from "@akasha/design-primitives/sub-view"
import { FilterGroup } from "akasha/design/patterns/filter-group/filter-group.module.code.tsx"

interface NotesOptionsPickerProps {
  notesProperty?: string
  notesPropertyOptions?: readonly { id: string; label: string }[]
  onNotesPropertyChange?: (propertyId: string | null) => void
  onBack: () => void
}

export function NotesOptionsPicker({
  notesProperty,
  notesPropertyOptions,
  onNotesPropertyChange,
  onBack,
}: NotesOptionsPickerProps) {
  return (
    <SubView title="Notes" onBack={onBack} className="gap-3">
      {onNotesPropertyChange != null && (
        <FilterGroup label="Notes Property">
          <FilterableList>
            <FilterableListItem
              selected={notesProperty == null || notesProperty === ""}
              onSelect={() => onNotesPropertyChange(null)}
            >
              Default
            </FilterableListItem>
            {(notesPropertyOptions ?? []).map((option) => (
              <FilterableListItem
                key={option.id}
                selected={option.id === notesProperty}
                onSelect={() => onNotesPropertyChange(option.id)}
              >
                {option.label}
              </FilterableListItem>
            ))}
          </FilterableList>
        </FilterGroup>
      )}
    </SubView>
  )
}
