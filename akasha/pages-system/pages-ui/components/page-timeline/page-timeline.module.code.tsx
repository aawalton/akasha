"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  buildTimelineLayout,
  rowsToTimelineInputs,
} from "@akasha/pages-ui-components/page-timeline-helpers"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { ReactNode } from "react"

interface PageTimelineProps {
  rows: readonly PageRow[]
  startPropertyId: string
  endPropertyId?: string
  renderItem: (item: PageRow) => ReactNode
}

function formatTimelineDate(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

const LABEL_GUTTER = "w-64 shrink-0"

export function PageTimeline({
  rows,
  startPropertyId,
  endPropertyId,
  renderItem,
}: PageTimelineProps) {
  const inputs = rowsToTimelineInputs(rows, startPropertyId, endPropertyId)
  const layout = buildTimelineLayout(inputs)
  const barById = new Map(layout.bars.map((bar) => [bar.id, bar]))

  return (
    <div className="flex flex-col gap-2 overflow-x-auto">
      {}
      <div className="flex items-end gap-3">
        <div className={LABEL_GUTTER} />
        <div className="relative h-5 flex-1 border-border border-b">
          {layout.ticks.map((tick) => (
            <span
              key={tick.ms}
              className="absolute bottom-1 -translate-x-1/2 whitespace-nowrap text-tertiary text-xs"
              style={{ left: `${tick.leftPct}%` }}
            >
              {formatTimelineDate(tick.ms)}
            </span>
          ))}
        </div>
      </div>

      {rows.map((row) => {
        const bar = barById.get(row._id)
        return (
          <div key={row._id} className="flex items-center gap-3">
            <div className={LABEL_GUTTER}>{renderItem(row)}</div>
            <div className={`relative h-8 flex-1 rounded ${surfaceClass(1)}`}>
              {bar == null ? (
                <span className="absolute top-1/2 left-2 -translate-y-1/2 text-tertiary text-xs">
                  No date
                </span>
              ) : bar.isPoint ? (
                <div
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  style={{ left: `${bar.leftPct}%` }}
                  title={formatTimelineDate(bar.startMs)}
                />
              ) : (
                <div
                  className="absolute top-1/2 h-5 -translate-y-1/2 rounded bg-accent"
                  style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%`, minWidth: "0.5rem" }}
                  title={`${formatTimelineDate(bar.startMs)} – ${formatTimelineDate(bar.endMs)}`}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
