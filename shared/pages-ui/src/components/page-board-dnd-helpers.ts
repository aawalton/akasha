export interface BoardColumnRect {
  key: string
  left: number
  width: number
}

export function computeBoardDropColumn(
  columns: readonly BoardColumnRect[],
  pointerX: number
): string | null {
  if (columns.length === 0) return null

  const first = columns[0]
  if (first === undefined) return null
  if (pointerX < first.left) return first.key

  for (const col of columns) {
    if (pointerX >= col.left && pointerX < col.left + col.width) return col.key
  }

  const last = columns[columns.length - 1]
  return last?.key ?? null
}
