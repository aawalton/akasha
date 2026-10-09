interface BarSpacing {
  readonly edgePad: number
  readonly minWidth: number
  readonly gap: number
}

interface CellSpan {
  readonly left: number
  readonly width: number
}

export function layoutCells(
  this: void,
  textWidths: readonly (number | undefined)[],
  spacing: BarSpacing
): (CellSpan | undefined)[] {
  let left = spacing.edgePad
  return textWidths.map((textWidth) => {
    if (textWidth === undefined) return undefined
    const width = Math.max(spacing.minWidth, Math.ceil(textWidth))
    const span = { left, width }
    left += width + spacing.gap
    return span
  })
}
