"use client"

import {
  BalancedColumns,
  getChildId,
} from "akasha/design/interfaces/layout/modules/balanced-columns/balanced-columns.module.code.tsx"
import {
  PanelDefaultOpenProvider,
  PanelSummaryProvider,
} from "akasha/design/interfaces/layout/panel-default-open-context/panel-default-open-context.module.code.tsx"
import { useColumnCount } from "akasha/design/interfaces/layout/use-column-count/use-column-count.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import type * as React from "react"
import { Children } from "react"

interface ResponsiveColumnsProps {
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  columnCount?: number
  hasSummaryPanel?: boolean
  sortChildren?: boolean
}

export function ResponsiveColumns({
  children,
  footer,
  className,
  columnCount: columnCountProp,
  hasSummaryPanel = false,
  sortChildren = true,
}: ResponsiveColumnsProps) {
  const contextColumnCount = useColumnCount()
  const columnCount = columnCountProp ?? contextColumnCount ?? 1

  const childArray = Children.toArray(children)

  if (columnCount > 1) {
    return (
      <BalancedColumns
        childArray={childArray}
        columnCount={columnCount}
        footer={footer}
        className={className}
        hasSummaryPanel={hasSummaryPanel}
        sortChildren={sortChildren}
      />
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {childArray.map((child, i) => {
        const id = getChildId(child)
        const isSummary = hasSummaryPanel && i === 0
        return (
          <div
            key={id ?? i}
            className="empty:hidden"
            style={id != null ? { viewTransitionName: `panel-${id}` } : undefined}
          >
            <PanelDefaultOpenProvider value={hasSummaryPanel && i === 0}>
              {isSummary ? (
                <PanelSummaryProvider value={true}>{child}</PanelSummaryProvider>
              ) : (
                child
              )}
            </PanelDefaultOpenProvider>
          </div>
        )
      })}
      {footer}
    </div>
  )
}
