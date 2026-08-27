"use client"

import { FilterableList, FilterableListItem } from "@shared/design-primitives/components/filterable-list"
import { Heading } from "@shared/design-primitives/components/heading"
import { SubView } from "@shared/design-primitives/components/sub-view"

interface TimelinePickerProps {
  propertyOptions: readonly { id: string; label: string }[]
  startProperty?: string
  endProperty?: string
  onStartChange: (id: string) => void
  onEndChange: (id: string | null) => void
  onBack: () => void
}

export function TimelinePicker({
  propertyOptions,
  startProperty,
  endProperty,
  onStartChange,
  onEndChange,
  onBack,
}: TimelinePickerProps) {
  return (
    <SubView title="Timeline" onBack={onBack}>
      {propertyOptions.length === 0 ? (
        <p className="px-2 py-1.5 text-secondary text-sm">
          This page type has no date properties to plot a timeline on.
        </p>
      ) : (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1">
            <Heading variant="label-muted">Start date</Heading>
            <FilterableList>
              {propertyOptions.map((option) => (
                <FilterableListItem
                  key={option.id}
                  selected={option.id === startProperty}
                  onSelect={() => onStartChange(option.id)}
                >
                  {option.label}
                </FilterableListItem>
              ))}
            </FilterableList>
          </div>
          <div className="flex flex-col gap-1">
            <Heading variant="label-muted">End date (optional)</Heading>
            <FilterableList>
              <FilterableListItem selected={endProperty == null} onSelect={() => onEndChange(null)}>
                None — show as points
              </FilterableListItem>
              {propertyOptions.map((option) => (
                <FilterableListItem
                  key={option.id}
                  selected={option.id === endProperty}
                  onSelect={() => onEndChange(option.id)}
                >
                  {option.label}
                </FilterableListItem>
              ))}
            </FilterableList>
          </div>
        </div>
      )}
    </SubView>
  )
}
