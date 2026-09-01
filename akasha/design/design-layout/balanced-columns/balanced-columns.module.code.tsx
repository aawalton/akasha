"use client"

import { cn } from "@akasha/design-primitives/cn"
import type * as React from "react"
import { isValidElement, useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  type BalancedLayout,
  decideBalancedLayout,
  GAP_PX,
  layoutEqual,
  type Measurement,
} from "../balanced-columns-layout/balanced-columns-layout.module.code.ts"
import {
  PanelDefaultOpenProvider,
  PanelSummaryProvider,
} from "../panel-default-open-context/panel-default-open-context.module.code.tsx"

export function BalancedColumns({
  childArray,
  columnCount,
  footer,
  className,
  hasSummaryPanel,
  sortChildren,
}: {
  childArray: readonly React.ReactNode[]
  columnCount: number
  footer?: React.ReactNode
  className?: string
  hasSummaryPanel: boolean
  sortChildren: boolean
}) {
  const measureRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<BalancedLayout | null>(null)
  const [measureAll, setMeasureAll] = useState(false)

  const titlesByIndex = useRef<Map<number, string>>(new Map())
  titlesByIndex.current.clear()
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i]
    if (isValidElement(child)) {
      const props: unknown = child.props
      const title =
        typeof props === "object" && props !== null && "title" in props ? props.title : undefined
      titlesByIndex.current.set(i, String(title ?? ""))
    }
  }

  const computeLayout = useCallback(() => {
    const measureContainer = measureRef.current
    const visibleContainer = containerRef.current
    if (!measureContainer || !visibleContainer) return

    if (!visibleContainer.offsetParent) return

    const wrappers = measureContainer.querySelectorAll<HTMLElement>("[data-measure-index]")

    const measurements: Measurement[] = []

    for (const wrapper of wrappers) {
      const childIndex = Number(wrapper.dataset.measureIndex)

      if (wrapper.childElementCount === 0) continue

      const expandedHeight = wrapper.offsetHeight
      const title = titlesByIndex.current.get(childIndex) ?? ""

      measurements.push({ childIndex, expandedHeight, title })
    }

    const availableHeight = window.innerHeight - visibleContainer.getBoundingClientRect().top

    const decision = decideBalancedLayout(measurements, {
      columnCount,
      totalChildren: childArray.length,
      hasSummaryPanel,
      sortChildren,
      availableHeight,
    })

    if (decision.kind === "noop") return
    if (decision.kind === "need-full-measure") {
      setMeasureAll(true)
      return
    }

    const newColumns = decision.columns
    setLayout((prev) => {
      if (prev && layoutEqual(prev.columns, newColumns)) return prev
      return { columns: newColumns }
    })
  }, [childArray.length, columnCount, hasSummaryPanel, sortChildren])

  useLayoutEffect(computeLayout, [computeLayout])

  useLayoutEffect(() => {
    if (measureAll) computeLayout()
  }, [measureAll, computeLayout])

  useLayoutEffect(() => {
    const visible = containerRef.current
    if (!visible) return
    let lastWidth = visible.offsetWidth
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const newWidth = entry.contentRect.width
      if (newWidth !== lastWidth) {
        lastWidth = newWidth
        setMeasureAll(false)
        computeLayout()
      }
    })
    observer.observe(visible)
    return () => observer.disconnect()
  }, [computeLayout])

  useLayoutEffect(() => {
    const measure = measureRef.current
    if (!measure) return
    const observer = new MutationObserver(() => computeLayout())
    observer.observe(measure, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [computeLayout])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {}
      <div
        ref={measureRef}
        inert
        aria-hidden="true"
        style={{
          visibility: "hidden",
          position: "absolute",
          caretColor: "transparent",
          width: `calc((100% - ${(columnCount - 1) * GAP_PX}px) / ${columnCount})`,
        }}
      >
        {childArray.map((child, i) =>
          i === 0 || measureAll ? (
            <PanelDefaultOpenProvider key={getChildId(child) ?? i} value={true}>
              <div data-measure-index={i}>{child}</div>
            </PanelDefaultOpenProvider>
          ) : null
        )}
      </div>

      {}
      {layout && (
        <div className="flex gap-6">
          {layout.columns.map((col, colIdx) =>
            col.length === 0 ? null : (
              <div
                key={colIdx}
                className="flex flex-col gap-6"
                style={{ width: `calc((100% - ${(columnCount - 1) * GAP_PX}px) / ${columnCount})` }}
              >
                {col.map(({ childIndex, defaultOpen }, itemIdx) => {
                  const child = childArray[childIndex]
                  const id = getChildId(child)
                  const isSummary = hasSummaryPanel && colIdx === 0 && itemIdx === 0
                  return (
                    <div
                      key={childIndex}
                      style={id != null ? { viewTransitionName: `panel-${id}` } : undefined}
                    >
                      <PanelDefaultOpenProvider value={defaultOpen}>
                        {isSummary ? (
                          <PanelSummaryProvider value={true}>{child}</PanelSummaryProvider>
                        ) : (
                          child
                        )}
                      </PanelDefaultOpenProvider>
                    </div>
                  )
                })}
              </div>
            )
          )}
          {footer}
        </div>
      )}
    </div>
  )
}

export function getChildId(child: React.ReactNode): string | undefined {
  if (!isValidElement(child)) return undefined
  const props: unknown = child.props
  if (typeof props === "object" && props !== null && "id" in props) {
    return typeof props.id === "string" ? props.id : undefined
  }
  return undefined
}
