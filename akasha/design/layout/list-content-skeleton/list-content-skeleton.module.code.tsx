"use client"

import { Skeleton } from "@akasha/design-primitives/skeleton"
import { createGenericLayout } from "../column-layout/column-layout.module.code.ts"
import { ResponsiveColumnsSkeleton } from "../responsive-columns-skeleton/responsive-columns-skeleton.module.code.tsx"

export function ListContentSkeleton({
  showTabTitle = true,
  showFilterBar = true,
  filterBarButtonCount = 3,
}: {
  showTabTitle?: boolean
  showFilterBar?: boolean
  filterBarButtonCount?: number
}) {
  return (
    <div className="flex flex-col gap-6">
      {(showTabTitle || showFilterBar) && (
        <div className="flex items-center gap-4">
          {showTabTitle && <Skeleton className="h-7 w-24" />}
          {showFilterBar && (
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {Array.from({ length: filterBarButtonCount }).map((_, i) => (
                <Skeleton key={i} className="size-9 rounded-md" />
              ))}
            </div>
          )}
        </div>
      )}
      <ResponsiveColumnsSkeleton layout={createGenericLayout()} />
    </div>
  )
}
