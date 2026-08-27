"use client"

import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { FilterableList, FilterableListItem } from "@shared/design-primitives/components/filterable-list"
import { SubView } from "@shared/design-primitives/components/sub-view"

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
