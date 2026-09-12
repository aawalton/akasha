export type Measured = {
  readonly label: string
  readonly level: number
  readonly figure: number
}

export const PLACES = 2

export function flooredTo(value: number, places: number): number {
  const scale = 10 ** places
  return Math.floor(value * scale) / scale
}

function widestOf(values: readonly string[]): number {
  return values.reduce((most, one) => Math.max(most, one.length), 0)
}

export function linesOf(measured: readonly Measured[]): readonly string[] {
  const cells = measured.map((one) => ({
    label: one.label,
    level: String(one.level),
    figure: one.figure.toFixed(PLACES),
  }))
  const labels = widestOf(cells.map((one) => one.label))
  const levels = widestOf(cells.map((one) => one.level))
  const figures = widestOf(cells.map((one) => one.figure))
  return cells.map(
    (one) =>
      `${one.label.padEnd(labels)}  ${one.level.padStart(levels)}  ${one.figure.padStart(figures)}`
  )
}
