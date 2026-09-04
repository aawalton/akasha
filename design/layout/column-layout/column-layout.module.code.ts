export interface ColumnLayout {
  1: readonly (readonly number[])[]
  2: readonly (readonly number[])[]
  3: readonly (readonly number[])[]
}

export function distributeRoundRobin(
  heights: readonly number[],
  columns: 1 | 2 | 3
): readonly (readonly number[])[] {
  const result: number[][] = Array.from({ length: columns }, () => [])
  heights.forEach((height, i) => {
    const col = result[i % columns]
    if (col) col.push(height)
  })
  return result
}

export function createRoundRobinLayout(heights: readonly number[]): ColumnLayout {
  return {
    1: distributeRoundRobin(heights, 1),
    2: distributeRoundRobin(heights, 2),
    3: distributeRoundRobin(heights, 3),
  }
}

export const COLLAPSED_PANEL_HEIGHT = 84

export function collapseSubsequentHeights(
  heights: readonly number[],
  threshold = 1
): readonly number[] {
  return heights.map((h, i) => (i < threshold ? h : COLLAPSED_PANEL_HEIGHT))
}

export function createCollapsibleRoundRobinLayout(heights: readonly number[]): ColumnLayout {
  return {
    1: distributeRoundRobin(collapseSubsequentHeights(heights, 1), 1),
    2: distributeRoundRobin(collapseSubsequentHeights(heights, 2 * 2), 2),
    3: distributeRoundRobin(collapseSubsequentHeights(heights, 2 * 3), 3),
  }
}

export function createMainWithFixedColumnLayout(
  mainHeights: readonly number[],
  fixedColumnHeights: readonly number[]
): ColumnLayout {
  return {
    1: [mainHeights],
    2: [mainHeights, fixedColumnHeights],
    3: [mainHeights, fixedColumnHeights],
  }
}

export function createCollapsibleMainWithFixedColumnLayout(
  mainHeights: readonly number[],
  fixedColumnHeights: readonly number[]
): ColumnLayout {
  return {
    1: [collapseSubsequentHeights(mainHeights)],
    2: [mainHeights, fixedColumnHeights],
    3: [mainHeights, fixedColumnHeights],
  }
}

const STANDARD_CARD_HEIGHT = 232
const CARDS_PER_COLUMN = 2

export function createGenericLayout(): ColumnLayout {
  return {
    1: [Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)],
    2: Array.from({ length: 2 }, () => Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)),
    3: Array.from({ length: 3 }, () => Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)),
  }
}

export function createGenericEditorLayout(): ColumnLayout {
  const col = Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)
  return {
    1: [col],
    2: [col, col],
    3: [col, col, col],
  }
}
