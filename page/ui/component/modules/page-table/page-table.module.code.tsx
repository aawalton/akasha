"use client"

import { LoadMoreButton } from "akasha/design/interfaces/layout/modules/load-more-button/load-more-button.module.code.tsx"
import { useLoadMore } from "akasha/design/interfaces/layout/modules/use-load-more/use-load-more.module.code.ts"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "akasha/design/interfaces/primitives/modules/table/table.module.code.tsx"
import type { PageRow } from "akasha/page/ui/component/components-view-engine/modules/view-row/view-row.module.code.ts"
import { PageTableColGroup } from "akasha/page/ui/component/modules/page-table-colgroup/page-table-colgroup.module.code.tsx"
import { ReorderableColumnTable } from "akasha/page/ui/component/modules/page-table-header/page-table-header.module.code.tsx"
import {
  ACTIONS_COLUMN_PX,
  type PageTableColumn,
} from "akasha/page/ui/component/modules/page-table-shared/page-table-shared.module.code.ts"
import { tableMinWidthPx } from "akasha/page/ui/component/modules/page-table-widths/page-table-widths.module.code.ts"
import type { ReactNode } from "react"

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
