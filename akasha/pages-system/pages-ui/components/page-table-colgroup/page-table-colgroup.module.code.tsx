import {
  ACTIONS_COLUMN_PX,
  type PageTableColumn,
} from "@akasha/pages-ui-components/page-table-shared"

interface PageTableColGroupProps {
  columns: readonly PageTableColumn[]
  hasRowActions?: boolean
}

export function PageTableColGroup({ columns, hasRowActions }: PageTableColGroupProps) {
  return (
    <colgroup>
      {columns.map((column) => (
        <col
          key={column.id}
          style={column.width != null ? { width: `${column.width}px` } : undefined}
        />
      ))}
      {hasRowActions === true && <col style={{ width: `${ACTIONS_COLUMN_PX}px` }} />}
    </colgroup>
  )
}
