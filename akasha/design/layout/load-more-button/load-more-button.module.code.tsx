"use client"

import { Button } from "@akasha/design-primitives/button"

interface LoadMoreButtonProps {
  visibleCount: number
  totalCount: number
  onLoadMore: () => void
  indeterminate?: boolean
}

export function LoadMoreButton({
  visibleCount,
  totalCount,
  onLoadMore,
  indeterminate,
}: LoadMoreButtonProps) {
  const remaining = totalCount - visibleCount

  const ariaLabel = indeterminate
    ? "Load more items"
    : `Load ${Math.min(remaining, 24)} more items, currently showing ${visibleCount} of ${totalCount}`

  return (
    <div className="flex w-full items-center justify-center">
      <Button variant="tertiary" onClick={onLoadMore} aria-label={ariaLabel}>
        Load More
      </Button>
    </div>
  )
}
