"use client"

import { LoadMoreButton } from "@shared/design-layout/components/load-more-button"
import { useLoadMore } from "@shared/design-layout/hooks/use-load-more"
import { Icon } from "@shared/design-patterns/components/icon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/design-primitives/components/table"
import { cn } from "@shared/design-primitives/utils/cn"
import { type PageDataJSON } from "@shared/pages-core/types"
import { expandDateMentions } from "@shared/pages-core/view/expand-date-mentions"
import { CheckCircle2, Circle } from "lucide-react"
import type { ReactNode } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "../property-types/property-badge.tsx"
import type { PageRow } from "../view-engine/page-row.ts"
import { PageActionsMenu } from "./page-actions-menu.tsx"
import { orderTableColumns } from "./page-properties-shared.ts"
import { PageTableColGroup } from "./page-table-colgroup.tsx"
import { ReorderableColumnTable } from "./page-table-header.tsx"
import { ACTIONS_COLUMN_PX, type PageTableColumn } from "./page-table-shared.ts"
import { tableMinWidthPx } from "./page-table-widths.ts"

interface PageTableProps {
  items: readonly PageRow[]
  columns: readonly PageTableColumn[]
  renderRow: (item: PageRow) => ReactNode
  onReorderColumns?: (orderedColumnIds: readonly string[]) => void
  hasRowActions?: boolean
  pageSize?: number
  resetKey?: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
}

export function PageTable({
  items,
  columns,
  renderRow,
  onReorderColumns,
  hasRowActions,
  pageSize = 12,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages,
}: PageTableProps) {
  const { visibleCount, hasMore, loadMore } = useLoadMore({
    totalCount: items.length,
    pageSize,
    resetKey,
    onServerLoadMore,
    canServerLoadMore,
    serverPrefetchPages,
  })
  const visibleItems = items.slice(0, visibleCount)

  const body = (
    <TableBody>
      {visibleItems.map((item) => (
        <TableRow
          key={item._id}
          className="border-primary/5 border-b transition-colors hover:bg-primary/5"
        >
          {renderRow(item)}
        </TableRow>
      ))}
    </TableBody>
  )

  return (
    <div className="flex flex-col gap-4">
      {onReorderColumns ? (
        <ReorderableColumnTable
          columns={columns}
          onReorderColumns={onReorderColumns}
          hasRowActions={hasRowActions}
        >
          {body}
        </ReorderableColumnTable>
      ) : (
        <Table
          className="table-fixed"
          style={{
            minWidth: tableMinWidthPx(columns) + (hasRowActions === true ? ACTIONS_COLUMN_PX : 0),
          }}
        >
          <PageTableColGroup columns={columns} hasRowActions={hasRowActions} />
          <TableHeader>
            <TableRow className="border-primary/10 border-b">
              {columns.map((column) => (
                <TableHead key={column.id} className="overflow-hidden text-left normal-case">
                  <span className="block truncate">{column.label}</span>
                </TableHead>
              ))}
              {hasRowActions === true && (
                <TableHead className="overflow-hidden text-left normal-case" aria-hidden />
              )}
            </TableRow>
          </TableHeader>
          {body}
        </Table>
      )}
      {hasMore && (
        <LoadMoreButton
          visibleCount={visibleCount}
          totalCount={items.length}
          onLoadMore={loadMore}
          indeterminate={canServerLoadMore === true && visibleCount >= items.length}
        />
      )}
    </div>
  )
}

interface PageTableRowCellsProps {
  data: PageDataJSON
  definitions: readonly PropertyDefinition[]
  visibleProperties?: readonly string[]
  rowHref: string
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onPropertyChange?: (propertyId: string, value: unknown, eventTimeStamp?: number) => void
  onCreateOption?: (propertyId: string, label: string) => void
  onComplete?: (value: number | null) => void
  isFavorite?: boolean
  onToggleFavorite?: (value: number | null) => void
  onDelete?: () => void
}

export function PageTableRowCells({
  data,
  definitions,
  visibleProperties,
  rowHref,
  pageHref,
  relationHref,
  onPropertyChange,
  onCreateOption,
  onComplete,
  isFavorite,
  onToggleFavorite,
  onDelete,
}: PageTableRowCellsProps) {
  const columns = orderTableColumns(definitions, visibleProperties ?? [])
  const resolvedTitle = data.title != null ? String(data.title) : "Untitled"
  const displayTitle = expandDateMentions(resolvedTitle)
  const iconName = data.icon != null ? String(data.icon) : null
  const hasCompletedAtDef = definitions.some((d) => d.id === "completedAt")
  const isCompleted = data.completedAt != null
  const showCompletionToggle = Boolean(onComplete) && hasCompletedAtDef
  const showActions = onToggleFavorite != null || onDelete != null

  return (
    <>
      {columns.map((col) =>
        col.isTitle ? (
          <TableCell
            key={col.id}
            className="overflow-hidden text-left font-medium font-sans text-primary"
          >
            <span className="flex min-w-0 items-center gap-2">
              {showCompletionToggle && (
                <button
                  type="button"
                  aria-label={isCompleted ? "Uncomplete" : "Complete"}
                  className="shrink-0 cursor-pointer text-tertiary transition-colors hover:text-primary"
                  onClick={() => onComplete?.(isCompleted ? null : Date.now())}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <Circle className="size-4" />
                  )}
                </button>
              )}
              <a
                href={rowHref}
                className={cn(
                  "flex min-w-0 items-center gap-2 hover:text-accent",
                  isCompleted && showCompletionToggle && "line-through opacity-60"
                )}
              >
                {!showCompletionToggle && iconName != null && (
                  <Icon name={iconName} className="size-4 shrink-0" />
                )}
                <span className="truncate">{displayTitle}</span>
              </a>
            </span>
          </TableCell>
        ) : (
          <TableCell key={col.id} className="overflow-hidden text-left font-sans">
            <PropertyBadge
              property={col.def}
              value={data[col.def.id] ?? null}
              context="card"
              editable={onPropertyChange != null}
              pageData={data}
              propertyDefinitions={definitions}
              onPropertyChange={onPropertyChange}
              onCreateOption={onCreateOption}
              pageHref={pageHref}
              relationHref={relationHref}
            />
          </TableCell>
        )
      )}
      {showActions && (
        <TableCell className="text-right align-middle">
          <PageActionsMenu
            href={rowHref !== "" ? rowHref : undefined}
            isFavorite={isFavorite}
            onToggleFavorite={
              onToggleFavorite != null
                ? () => onToggleFavorite(isFavorite === true ? null : Date.now())
                : undefined
            }
            onDelete={onDelete}
            align="end"
          />
        </TableCell>
      )}
    </>
  )
}
