interface BarSpacing {
  readonly edgePad: number
  readonly minWidth: number
  readonly gap: number
}

interface CellSpan {
  readonly shown: boolean
  readonly left: number
  readonly width: number
}

export function layoutCells(
  this: void,
  textWidths: readonly number[],
  spacing: BarSpacing
): CellSpan[] {
  let left = spacing.edgePad
  return textWidths.map((textWidth) => {
    if (textWidth <= 0) return { shown: false, left, width: 0 }
    const width = Math.max(spacing.minWidth, Math.ceil(textWidth))
    const span = { shown: true, left, width }
    left += width + spacing.gap
    return span
  })
}
