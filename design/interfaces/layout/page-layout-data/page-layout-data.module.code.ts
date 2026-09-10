import { COLUMN_GAP, COLUMN_WIDTH, PAGE_PADDING } from "../layout-data/layout-data.module.code.ts"

export const PAGE_TITLE_CLASSES =
  "font-bold text-2xl text-primary max-w-[50cqw] truncate select-none"

export function getPageWidth(columnCount: number): number {
  return columnCount * COLUMN_WIDTH + (columnCount - 1) * COLUMN_GAP + PAGE_PADDING
}
