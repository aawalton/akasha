"use client"

import { Skeleton } from "@shared/design-primitives/components/skeleton"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import type { ColumnLayout } from "./column-layout"


export function ResponsiveColumnsSkeleton({ layout }: { layout: ColumnLayout }) {
  return (
    <>
      {}
      <div className="flex @[1016px]:hidden flex-col gap-6">
        {layout[1].map((column, colIndex) =>
          column.map((height, i) => <SkeletonPanelCard key={`${colIndex}-${i}`} height={height} />)
        )}
      </div>

      {}
      <div className="@[1016px]:flex @[1512px]:hidden hidden gap-6">
        {layout[2].map((column, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-6">
            {column.map((height, i) => (
              <SkeletonPanelCard key={i} height={height} />
            ))}
          </div>
        ))}
      </div>

      {}
      <div className="@[1512px]:flex hidden gap-6">
        {layout[3].map((column, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-6">
            {column.map((height, i) => (
              <SkeletonPanelCard key={i} height={height} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export function SkeletonPanelCard({ height }: { height: number }) {
  const surface = useSurface()
  return (
    <div
      className={`w-full rounded-xl ${surfaceClass(surface + 1)} p-6 min-[520px]:w-panel`}
      style={{ height }}
    >
      <Skeleton className="h-5 w-32" />
    </div>
  )
}
