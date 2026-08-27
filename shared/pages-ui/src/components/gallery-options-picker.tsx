"use client"

import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { FilterableList, FilterableListItem } from "@shared/design-primitives/components/filterable-list"
import { SubView } from "@shared/design-primitives/components/sub-view"
import { GALLERY_CARD_SIZES, type GalleryCardSize } from "@shared/pages-core/view/gallery"

interface GalleryOptionsPickerProps {
  coverSource?: string
  coverSourceOptions?: readonly { id: string; label: string }[]
  onCoverSourceChange?: (propertyId: string | null) => void
  cardSize?: GalleryCardSize
  onCardSizeChange?: (size: GalleryCardSize) => void
  onBack: () => void
}

const CARD_SIZE_LABELS: Record<GalleryCardSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
}

export function GalleryOptionsPicker({
  coverSource,
  coverSourceOptions,
  onCoverSourceChange,
  cardSize,
  onCardSizeChange,
  onBack,
}: GalleryOptionsPickerProps) {
  return (
    <SubView title="Gallery" onBack={onBack} className="gap-3">
      {onCoverSourceChange != null && (
        <FilterGroup label="Cover Source">
          <FilterableList>
            <FilterableListItem
              selected={coverSource == null || coverSource === ""}
              onSelect={() => onCoverSourceChange(null)}
            >
              None
            </FilterableListItem>
            {(coverSourceOptions ?? []).map((option) => (
              <FilterableListItem
                key={option.id}
                selected={option.id === coverSource}
                onSelect={() => onCoverSourceChange(option.id)}
              >
                {option.label}
              </FilterableListItem>
            ))}
          </FilterableList>
        </FilterGroup>
      )}
      {onCardSizeChange != null && (
        <FilterGroup label="Card Size">
          <FilterableList>
            {GALLERY_CARD_SIZES.map((size) => (
              <FilterableListItem
                key={size}
                selected={size === (cardSize ?? "medium")}
                onSelect={() => onCardSizeChange(size)}
              >
                {CARD_SIZE_LABELS[size]}
              </FilterableListItem>
            ))}
          </FilterableList>
        </FilterGroup>
      )}
    </SubView>
  )
}
