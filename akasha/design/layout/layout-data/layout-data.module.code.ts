export const COLUMN_WIDTH = 472
export const COLUMN_GAP = 24
export const PAGE_PADDING = 48

export function computeColumnCount(width: number): number {
  return Math.max(1, Math.floor((width - PAGE_PADDING + COLUMN_GAP) / (COLUMN_WIDTH + COLUMN_GAP)))
}
