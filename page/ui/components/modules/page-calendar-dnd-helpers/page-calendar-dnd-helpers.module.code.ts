export interface CalendarCellRect {
  day: string
  left: number
  top: number
  width: number
  height: number
}

export function computeCalendarDropDay(
  cells: readonly CalendarCellRect[],
  pointerX: number,
  pointerY: number
): string | null {
  for (const cell of cells) {
    const insideX = pointerX >= cell.left && pointerX < cell.left + cell.width
    const insideY = pointerY >= cell.top && pointerY < cell.top + cell.height
    if (insideX && insideY) return cell.day
  }
  return null
}
