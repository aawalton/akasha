"use client"

import { NumberBadge } from "@akasha/design-badges/number-badge"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SubView } from "@akasha/design-primitives/sub-view"
import {
  DEFAULT_GROUP_PAGE_SIZE,
  DEFAULT_ITEM_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
} from "@akasha/pages-core/schema/view-data"

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

const noop = (_n: number) => {}
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
              onChange={onGroupPageSizeChange ?? noop}
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
              onChange={onItemPageSizeChange ?? noop}
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
              onChange={onPageSizeChange ?? noop}
            />
          </FilterGroup>
        </div>
      )}
    </SubView>
  )
}
