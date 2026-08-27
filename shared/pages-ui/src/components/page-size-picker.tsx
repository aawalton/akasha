"use client"

import { NumberBadge } from "@shared/design-badges/components/number-badge"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SubView } from "@shared/design-primitives/components/sub-view"
import { DEFAULT_GROUP_PAGE_SIZE, DEFAULT_ITEM_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "@shared/pages-core/schema/view-data"

interface PageSizePickerProps {
  groupBy: string | null
  pageSize?: number
  groupPageSize?: number
  itemPageSize?: number
  onPageSizeChange?: (value: number) => void
  onGroupPageSizeChange?: (value: number) => void
  onItemPageSizeChange?: (value: number) => void
  onBack: () => void
}

const NOOP = (_n: number) => {}
const formatPlain = (n: number) => String(n)

export function PageSizePicker({
  groupBy,
  pageSize,
  groupPageSize,
  itemPageSize,
  onPageSizeChange,
  onGroupPageSizeChange,
  onItemPageSizeChange,
  onBack,
}: PageSizePickerProps) {
  const isGrouped = groupBy != null && groupBy !== ""
  return (
    <SubView title="Page Size" onBack={onBack} className="gap-3">
      {isGrouped ? (
        <div className="flex flex-col gap-3">
          <FilterGroup label="Group Page Size">
            <NumberBadge
              editable
              aria-label="Group Page Size"
              value={groupPageSize ?? DEFAULT_GROUP_PAGE_SIZE}
              min={1}
              variant="elevation"
              format={formatPlain}
              prefix=""
              onChange={onGroupPageSizeChange ?? NOOP}
            />
          </FilterGroup>
          <FilterGroup label="Item Page Size">
            <NumberBadge
              editable
              aria-label="Item Page Size"
              value={itemPageSize ?? DEFAULT_ITEM_PAGE_SIZE}
              min={1}
              variant="elevation"
              format={formatPlain}
              prefix=""
              onChange={onItemPageSizeChange ?? NOOP}
            />
          </FilterGroup>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <FilterGroup label="Page Size">
            <NumberBadge
              editable
              aria-label="Page Size"
              value={pageSize ?? DEFAULT_PAGE_SIZE}
              min={1}
              variant="elevation"
              format={formatPlain}
              prefix=""
              onChange={onPageSizeChange ?? NOOP}
            />
          </FilterGroup>
        </div>
      )}
    </SubView>
  )
}
